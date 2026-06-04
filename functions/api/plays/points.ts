import { json, bad } from "../util/http";
import { getSessionUser, ensureProfile } from "../util/auth";

/**
 * Ví Muôn Điểm (MĐ). KHÔNG mua bằng tiền, KHÔNG quy đổi ra tiền mặt.
 *
 * GET  /api/plays/points                 -> { ok, balance, recent: [...] }
 * POST /api/plays/points
 *   { action:'earn',     game, amount, reason }            -> cộng điểm khi chơi
 *   { action:'transfer', to, amount, reason }              -> chuyển P2P nội bộ
 *
 * Số dư = SUM(delta) trong sổ cái (nguồn sự thật). points_balance chỉ là cache.
 */
const DAILY_EARN_CAP = 5000;   // trần điểm kiếm/ngày (chống farm)
const PER_AWARD_CAP  = 1000;   // trần mỗi lần earn
const MIN_TRANSFER   = 1;

export const onRequestGet: PagesFunction = async (ctx) => {
  const user = await getSessionUser(ctx);
  if (!user) return json({ ok: true, loggedIn: false, balance: 0, recent: [] });
  const { env } = ctx as any;
  try {
    const bal = await balanceOf(env, user.uid);
    const res = await env.DB.prepare(
      `SELECT delta, kind, game_id, reason, created_at
       FROM plays_point_ledger WHERE user_id = ? ORDER BY created_at DESC LIMIT 30`
    ).bind(user.uid).all<any>();
    return json({ ok: true, loggedIn: true, balance: bal, recent: res.results || [] });
  } catch (e: any) {
    return bad(500, "db_error", String(e?.message || e));
  }
};

export const onRequestPost: PagesFunction = async (ctx) => {
  const user = await getSessionUser(ctx);
  if (!user) return bad(401, "unauthorized", "Cần đăng nhập.");
  const { env } = ctx as any;

  let body: any = {};
  try { body = await ctx.request.json(); } catch {}
  const action = String(body.action || "earn");
  const now = Date.now();

  try {
    await ensureProfile(env, user.uid, user.email);

    if (action === "earn") {
      let amount = Math.floor(Number(body.amount) || 0);
      if (amount <= 0) return bad(400, "bad_amount", "amount > 0");
      amount = Math.min(amount, PER_AWARD_CAP);

      // trần ngày
      const earnedToday = await earnedSince(env, user.uid, startOfDay(now));
      if (earnedToday >= DAILY_EARN_CAP) {
        return json({ ok: true, balance: await balanceOf(env, user.uid), capped: true });
      }
      amount = Math.min(amount, DAILY_EARN_CAP - earnedToday);

      await ledger(env, {
        user_id: user.uid, delta: amount, kind: "earn_play",
        game_id: String(body.game || "").slice(0, 64) || null,
        reason: String(body.reason || "play").slice(0, 120), created_at: now,
      });
      await syncCache(env, user.uid);
      return json({ ok: true, balance: await balanceOf(env, user.uid), awarded: amount });
    }

    if (action === "transfer") {
      const to = String(body.to || "").slice(0, 64);
      const amount = Math.floor(Number(body.amount) || 0);
      if (!to) return bad(400, "bad_to", "Thiếu người nhận.");
      if (to === user.uid) return bad(400, "self", "Không thể tự chuyển cho mình.");
      if (amount < MIN_TRANSFER) return bad(400, "bad_amount", "Số điểm không hợp lệ.");

      const bal = await balanceOf(env, user.uid);
      if (bal < amount) return bad(400, "insufficient", "Không đủ số dư.");

      const dst = await env.DB.prepare(`SELECT user_id FROM plays_profiles WHERE user_id = ?`).bind(to).first<any>();
      if (!dst) return bad(404, "no_recipient", "Người nhận chưa có hồ sơ plays.");

      const reason = String(body.reason || "transfer").slice(0, 120);
      // ghi kép
      await ledger(env, { user_id: user.uid, delta: -amount, kind: "transfer_out", ref_user: to, reason, created_at: now });
      await ledger(env, { user_id: to,       delta:  amount, kind: "transfer_in",  ref_user: user.uid, reason, created_at: now });
      await syncCache(env, user.uid); await syncCache(env, to);
      return json({ ok: true, balance: await balanceOf(env, user.uid) });
    }

    return bad(400, "bad_action", "action không hợp lệ.");
  } catch (e: any) {
    return bad(500, "db_error", String(e?.message || e));
  }
};

// ----- helpers -----
async function balanceOf(env: any, uid: string): Promise<number> {
  const r = await env.DB.prepare(`SELECT COALESCE(SUM(delta),0) AS b FROM plays_point_ledger WHERE user_id = ?`)
    .bind(uid).first<any>();
  return Number(r?.b || 0);
}
async function earnedSince(env: any, uid: string, ts: number): Promise<number> {
  const r = await env.DB.prepare(
    `SELECT COALESCE(SUM(delta),0) AS b FROM plays_point_ledger WHERE user_id = ? AND delta > 0 AND created_at >= ?`
  ).bind(uid, ts).first<any>();
  return Number(r?.b || 0);
}
async function ledger(env: any, e: any) {
  const id = crypto.randomUUID();
  await env.DB.prepare(
    `INSERT INTO plays_point_ledger (id, user_id, delta, kind, game_id, ref_user, reason, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(id, e.user_id, e.delta, e.kind, e.game_id || null, e.ref_user || null, e.reason || null, e.created_at).run();
}
async function syncCache(env: any, uid: string) {
  const bal = await balanceOf(env, uid);
  await env.DB.prepare(`UPDATE plays_profiles SET points_balance = ?, updated_at = ? WHERE user_id = ?`)
    .bind(bal, Date.now(), uid).run();
}
function startOfDay(ts: number) { const d = new Date(ts); d.setHours(0, 0, 0, 0); return d.getTime(); }
