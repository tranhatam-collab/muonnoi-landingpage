// plays-sdk.js — Muon Nơi Game Platform SDK
// Dual-mode: Guest (localStorage) + Member (D1 API)
// i18n: vi (default) | en
// No eval, no external dependencies, vanilla JS

(function (global) {
  'use strict';

  const VERSION = '1.0.0';
  const API_BASE = 'https://api.muonnoi.org';
  const LS_PREFIX = 'plays_';

  // ===== I18N =====
  const I18N = {
    vi: {
      guest: 'Khách',
      member: 'Thành viên',
      score: 'Điểm',
      highScore: 'Kỷ lục',
      level: 'Cấp',
      play: 'Chơi',
      pause: 'Tạm dừng',
      resume: 'Tiếp tục',
      restart: 'Chơi lại',
      tutorial: 'Hướng dẫn',
      close: 'Đóng',
      next: 'Tiếp',
      prev: 'Trước',
      finish: 'Hoàn tất',
      tapToStart: 'Nhấn để bắt đầu',
      gameOver: 'Kết thúc',
      yourScore: 'Điểm của bạn',
      personalBest: 'Kỷ lục cá nhân',
      loginToSave: 'Đăng nhập để lưu vĩnh viễn',
      syncing: 'Đang đồng bộ...',
      synced: 'Đã đồng bộ',
      offlineMode: 'Chế độ ngoại tuyến',
      pointsEarned: 'Muon Diem kiem duoc',
    },
    en: {
      guest: 'Guest',
      member: 'Member',
      score: 'Score',
      highScore: 'High Score',
      level: 'Level',
      play: 'Play',
      pause: 'Pause',
      resume: 'Resume',
      restart: 'Restart',
      tutorial: 'Tutorial',
      close: 'Close',
      next: 'Next',
      prev: 'Prev',
      finish: 'Finish',
      tapToStart: 'Tap to start',
      gameOver: 'Game Over',
      yourScore: 'Your score',
      personalBest: 'Personal best',
      loginToSave: 'Login to save permanently',
      syncing: 'Syncing...',
      synced: 'Synced',
      offlineMode: 'Offline mode',
      pointsEarned: 'Points earned',
    },
  };

  let currentLang = 'vi';

  function t(key) {
    const dict = I18N[currentLang] || I18N.vi;
    return dict[key] || key;
  }

  function setLang(lang) {
    currentLang = lang === 'en' ? 'en' : 'vi';
    localStorage.setItem(LS_PREFIX + 'lang', currentLang);
    document.documentElement.lang = currentLang;
  }

  // Load saved lang
  const savedLang = localStorage.getItem(LS_PREFIX + 'lang');
  if (savedLang) currentLang = savedLang;

  // ===== GUEST STORAGE =====
  function lsKey(gameId) {
    return LS_PREFIX + 'scores_' + gameId;
  }

  function getGuestScores(gameId) {
    try {
      const raw = localStorage.getItem(lsKey(gameId));
      if (!raw) return { best: 0, history: [], total: 0 };
      const data = JSON.parse(raw);
      return { best: data.best || 0, history: data.history || [], total: data.total || 0 };
    } catch (e) {
      return { best: 0, history: [], total: 0 };
    }
  }

  function saveGuestScore(gameId, score, level) {
    const data = getGuestScores(gameId);
    data.history.push({ score, level, ts: Date.now() });
    data.total += score;
    if (score > data.best) data.best = score;
    // Keep last 50 entries
    if (data.history.length > 50) data.history = data.history.slice(-50);
    localStorage.setItem(lsKey(gameId), JSON.stringify(data));
    return data;
  }

  function getAllGuestProgress() {
    const out = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(LS_PREFIX + 'scores_')) {
        const gid = k.slice((LS_PREFIX + 'scores_').length);
        try { out[gid] = JSON.parse(localStorage.getItem(k)); } catch (e) {}
      }
    }
    return out;
  }

  // ===== MEMBER API =====
  async function api(path, opts) {
    const url = API_BASE + path;
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
      ...(opts || {}),
    });
    const body = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data: body };
  }

  async function syncProgress(token) {
    if (!token) return { ok: false, reason: 'no_token' };
    const guestData = getAllGuestProgress();
    if (!Object.keys(guestData).length) return { ok: true, reason: 'no_guest_data' };

    const { ok, data } = await api('/api/plays/link', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token },
      body: JSON.stringify({ guestScores: guestData }),
    });

    if (ok && data && data.ok) {
      // Clear guest scores after successful merge
      for (const k of Object.keys(localStorage)) {
        if (k.startsWith(LS_PREFIX + 'scores_')) localStorage.removeItem(k);
      }
      return { ok: true, merged: data.merged || {} };
    }
    return { ok: false, reason: 'api_error', data };
  }

  async function submitScore(gameId, score, level, token) {
    if (!token) {
      return { mode: 'guest', data: saveGuestScore(gameId, score, level) };
    }
    const { ok, data } = await api('/api/plays/progress', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token },
      body: JSON.stringify({ gameId, score, level, ts: Date.now() }),
    });
    if (ok && data && data.ok) {
      return { mode: 'member', data: data };
    }
    // Fallback to guest on API failure
    return { mode: 'guest', data: saveGuestScore(gameId, score, level) };
  }

  async function getLeaderboard(gameId, token) {
    if (!token) return { ok: false, reason: 'no_token' };
    return api('/api/plays/leaderboard?gameId=' + encodeURIComponent(gameId), {
      headers: { Authorization: 'Bearer ' + token },
    });
  }

  async function getPointsBalance(token) {
    if (!token) return { ok: false, reason: 'no_token' };
    return api('/api/plays/points', {
      headers: { Authorization: 'Bearer ' + token },
    });
  }

  // ===== TUTORIAL SYSTEM =====
  function buildTutorial(opts) {
    const { steps, onFinish, onClose } = opts;
    let current = 0;

    const overlay = document.createElement('div');
    overlay.className = 'plays-tutorial-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    function renderStep() {
      const s = steps[current];
      const total = steps.length;
      const isLast = current === total - 1;
      overlay.innerHTML = `
        <div class="plays-tutorial-box">
          <div class="plays-tutorial-step">${current + 1}/${total}</div>
          <h3 class="plays-tutorial-title">${s.title}</h3>
          <p class="plays-tutorial-desc">${s.desc}</p>
          ${s.img ? `<img src="${s.img}" alt="${s.title}" loading="lazy" class="plays-tutorial-img">` : ''}
          <div class="plays-tutorial-nav">
            <button class="plays-btn plays-btn-ghost" ${current === 0 ? 'disabled' : ''} data-action="prev">${t('prev')}</button>
            <button class="plays-btn plays-btn-primary" data-action="${isLast ? 'finish' : 'next'}">${isLast ? t('finish') : t('next')}</button>
          </div>
          <button class="plays-tutorial-close" data-action="close" aria-label="${t('close')}">×</button>
        </div>
      `;
    }

    overlay.addEventListener('click', (e) => {
      const a = e.target.dataset.action;
      if (!a) return;
      if (a === 'close') { close(); onClose && onClose(); return; }
      if (a === 'prev') { current = Math.max(0, current - 1); renderStep(); return; }
      if (a === 'next') { current++; renderStep(); return; }
      if (a === 'finish') { close(); onFinish && onFinish(); }
    });

    function open() { renderStep(); document.body.appendChild(overlay); }
    function close() { overlay.remove(); }

    return { open, close };
  }

  // ===== GAME OVER UI =====
  function showGameOver(opts, scoreArg, metaArg, cbArg) {
    // Backward-compatible overload: showGameOver(gameId, score, {level}, callback)
    if (typeof opts === 'string') {
      opts = { gameId: opts, score: scoreArg, level: metaArg && metaArg.level, best: 0, isNewBest: false, token: null, onRestart: cbArg, onBack: () => { location.href = '../../'; } };
    }
    const { gameId, score, level, best, isNewBest, token, onRestart, onBack } = opts;
    const overlay = document.createElement('div');
    overlay.className = 'plays-gameover-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    const isGuest = !token;

    overlay.innerHTML = `
      <div class="plays-gameover-box">
        <h2 class="plays-gameover-title">${t('gameOver')}</h2>
        <div class="plays-gameover-score-row">
          <div class="plays-gameover-score-label">${t('yourScore')}</div>
          <div class="plays-gameover-score-value">${score.toLocaleString(currentLang)}</div>
        </div>
        <div class="plays-gameover-best-row">
          <div class="plays-gameover-best-label">${t('personalBest')}</div>
          <div class="plays-gameover-best-value">${best.toLocaleString(currentLang)} ${isNewBest ? '★' : ''}</div>
        </div>
        ${level ? `<div class="plays-gameover-level">${t('level')}: ${level}</div>` : ''}
        ${isGuest ? `<div class="plays-gameover-hint">${t('loginToSave')}</div>` : `<div class="plays-gameover-hint">${t('pointsEarned')}: +${Math.floor(score / 100)}</div>`}
        <div class="plays-gameover-actions">
          <button class="plays-btn plays-btn-primary" data-action="restart">${t('restart')}</button>
          <button class="plays-btn plays-btn-ghost" data-action="back">${t('close')}</button>
        </div>
      </div>
    `;

    overlay.addEventListener('click', (e) => {
      const a = e.target.dataset.action;
      if (a === 'restart') { overlay.remove(); onRestart && onRestart(); }
      if (a === 'back') { overlay.remove(); onBack && onBack(); }
    });

    document.body.appendChild(overlay);
    return { close: () => overlay.remove() };
  }

  // ===== HUD HELPER =====
  function createHud(rootId, opts) {
    const root = document.getElementById(rootId);
    if (!root) return null;
    root.innerHTML = '';

    const hud = document.createElement('div');
    hud.className = 'plays-hud';
    hud.innerHTML = `
      <div class="plays-hud-left">
        <span class="plays-hud-score" id="hud-score">${t('score')}: 0</span>
        ${opts.showLevel ? `<span class="plays-hud-level" id="hud-level">${t('level')}: 1</span>` : ''}
      </div>
      <div class="plays-hud-right">
        <button class="plays-hud-btn" id="hud-pause" aria-label="${t('pause')}">⏸</button>
      </div>
    `;
    root.appendChild(hud);

    const scoreEl = document.getElementById('hud-score');
    const levelEl = opts.showLevel ? document.getElementById('hud-level') : null;
    const pauseBtn = document.getElementById('hud-pause');

    return {
      setScore: (v) => { if (scoreEl) scoreEl.textContent = `${t('score')}: ${v.toLocaleString(currentLang)}`; },
      setLevel: (v) => { if (levelEl) levelEl.textContent = `${t('level')}: ${v}`; },
      onPause: (fn) => { pauseBtn.addEventListener('click', fn); },
    };
  }

  // ===== INIT =====
  function init() {
    // If a member token exists (from app.muonnoi.org), sync guest scores
    const token = localStorage.getItem('mn_session');
    if (token) {
      syncProgress(token).catch(() => {});
    }
  }

  // Expose
  const PlaysSDK = {
    VERSION,
    t,
    setLang,
    getGuestScores,
    saveGuestScore,
    saveScore: saveGuestScore, // backward-compat alias
    getAllGuestProgress,
    syncProgress,
    submitScore,
    getLeaderboard,
    getPointsBalance,
    buildTutorial,
    showTutorial: (gameId, steps) => buildTutorial({ steps, onFinish: () => {}, onClose: () => {} }).open(), // backward-compat wrapper
    showGameOver,
    createHud,
    init,
  };

  global.PlaysSDK = PlaysSDK;
})(window);
