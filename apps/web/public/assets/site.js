/* apps/web/public/assets/site.js
   MN Core UI helpers (no libs, no trackers)
   - Mobile burger menu
   - Active nav pill based on pathname
   - Theme toggle (auto/light/dark) with persistence
   - Year stamp
   - Page-specific hooks (Complaints form demo without inline JS)
*/

(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // -----------------------------
  // Utilities
  // -----------------------------
  function safePathname() {
    try {
      return (location.pathname || "/").replace(/\/+$/, "") || "/";
    } catch (_) {
      return "/";
    }
  }

  function normalizeRoute(href) {
    if (!href) return null;
    // ignore external
    if (/^https?:\/\//i.test(href)) return null;

    // keep only pathname part, strip hash/query, strip trailing slash
    const h = href.split("#")[0].split("?")[0];
    const p = h.replace(/\/+$/, "") || "/";
    return p;
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  // -----------------------------
  // Year in footer
  // -----------------------------
  (function setYear() {
    const y = String(new Date().getFullYear());
    const els = document.querySelectorAll("#year");
    els.forEach((el) => (el.textContent = y));
  })();

  // -----------------------------
  // Theme
  // data-theme="auto|dark|light"
  // -----------------------------
  const THEME_KEY = "mn_theme";
  const themeBtn = document.getElementById("themeBtn");

  function applyTheme(mode) {
    const html = document.documentElement;
    const v = (mode === "dark" || mode === "light" || mode === "auto") ? mode : "auto";
    html.setAttribute("data-theme", v);

    // Optional: some CSS may use these hooks
    html.classList.toggle("theme-dark", v === "dark");
    html.classList.toggle("theme-light", v === "light");
    html.classList.toggle("theme-auto", v === "auto");

    try { localStorage.setItem(THEME_KEY, v); } catch (_) {}
    if (themeBtn) {
      // simple icon hint
      themeBtn.textContent = (v === "dark") ? "◑" : (v === "light") ? "◐" : "◒";
      themeBtn.setAttribute("aria-label", "Theme: " + v);
    }
  }

  function nextTheme(cur) {
    // cycle auto -> dark -> light -> auto
    if (cur === "auto") return "dark";
    if (cur === "dark") return "light";
    return "auto";
  }

  (function initTheme() {
    let saved = "auto";
    try { saved = localStorage.getItem(THEME_KEY) || "auto"; } catch (_) {}
    applyTheme(saved);
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        let cur = "auto";
        try { cur = localStorage.getItem(THEME_KEY) || document.documentElement.getAttribute("data-theme") || "auto"; } catch (_) {}
        applyTheme(nextTheme(cur));
      });
    }
  })();

  // -----------------------------
  // Language button (stub)
  // Keeps current behavior minimal; you can wire to i18n.json later
  // -----------------------------
  const langBtn = document.getElementById("langBtn");
  const LANG_STORAGE_KEY = "mn_lang";
  const LANG_VI_TEXT = "Tiếng Việt";
  const LANG_EN_TEXT = "English";
  function setLangLabel(v) {
    if (!langBtn) return;
    langBtn.textContent = (v === "en") ? LANG_EN_TEXT : LANG_VI_TEXT;
    langBtn.setAttribute("aria-label", v === "en" ? "Chuyển sang Tiếng Việt" : "Chuyển sang English");
  }

  function getStoredLang() {
    try {
      const s = localStorage.getItem(LANG_STORAGE_KEY);
      if (s === "en") return "en";
      if (s === "vi") return "vi";
    } catch (_) {}
    return (document.documentElement.getAttribute("lang") === "en") ? "en" : "vi";
  }

  function setLang(v) {
    const next = (v === "en") ? "en" : "vi";
    document.documentElement.setAttribute("lang", next);
    setLangLabel(next);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch (_) {}
  }

  (function initLang() {
    if (!langBtn) return;
    setLang(getStoredLang());
    langBtn.addEventListener("click", () => {
      const cur = getStoredLang();
      setLang(cur === "en" ? "vi" : "en");
    });
  })();

  // -----------------------------
  // Mobile Burger Menu
  // -----------------------------
  const burger = document.getElementById("mnBurger");
  const mobile = document.getElementById("mnMobile");

  function closeMobile() {
    if (!mobile) return;
    mobile.hidden = true;
    if (burger) burger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("mn-menu-open");
  }

  function openMobile() {
    if (!mobile) return;
    mobile.hidden = false;
    if (burger) burger.setAttribute("aria-expanded", "true");
    document.body.classList.add("mn-menu-open");
  }

  function toggleMobile() {
    if (!mobile) return;
    if (mobile.hidden) openMobile();
    else closeMobile();
  }

  (function initMobileMenu() {
    if (!burger || !mobile) return;

    burger.setAttribute("aria-expanded", "false");
    burger.addEventListener("click", (e) => {
      e.preventDefault();
      toggleMobile();
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (mobile.hidden) return;
      const t = e.target;
      if (!t) return;
      if (mobile.contains(t) || burger.contains(t)) return;
      closeMobile();
    });

    // Close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMobile();
    });

    // Close on route click (mobile items)
    $$(".mn-mobile__item", mobile).forEach((a) => {
      a.addEventListener("click", () => closeMobile());
    });
  })();

  // -----------------------------
  // Active nav pill (desktop)
  // -----------------------------
  (function initActiveNav() {
    const path = safePathname();
    const links = $$(".mn-nav a.mn-pill");

    // Clear all first
    links.forEach((a) => a.classList.remove("is-active"));

    // Try to match exact route
    let matched = null;
    for (const a of links) {
      const p = normalizeRoute(a.getAttribute("href"));
      if (!p) continue;
      if (p === path) { matched = a; break; }
    }

    // Fallback: match section root for nested routes (e.g., /complaints -> /complaints)
    if (!matched && path !== "/") {
      for (const a of links) {
        const p = normalizeRoute(a.getAttribute("href"));
        if (!p || p === "/") continue;
        if (path.startsWith(p + "/") || path === p) { matched = a; break; }
      }
    }

    if (matched) matched.classList.add("is-active");
  })();

  // -----------------------------
  // Page-specific hook: Complaints demo submit (no inline JS)
  // Requires:
  // - form#complaintsForm
  // - div#complaintsResult
  // -----------------------------
  (function initComplaintsDemo() {
    const form = document.getElementById("complaintsForm");
    const out = document.getElementById("complaintsResult");
    if (!form || !out) return;

    function show(msg) {
      out.style.display = "block";
      out.textContent = msg;
    }

    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      show("Đã ghi nhận UI báo cáo (chưa gửi API). Bước tiếp theo: nối Worker/D1 để tạo report_id và lưu trạng thái.");
    });

    form.addEventListener("reset", () => {
      out.style.display = "none";
      out.textContent = "";
    });
  })();

})();
