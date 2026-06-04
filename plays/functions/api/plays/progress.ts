import { json, bad } from "../util/http";
import { getSessionUser, ensureProfile } from "../util/auth";

/**
 * GET  /api/plays/progress?game=<id>   -> { ok, progress }  (progress=null nếu chưa có)
 * GET  /api/plays/progress             -> { ok, items: [...] } (toàn bộ lịch sử user)
 * POST /api/plays/progress  body: { game, status, level, score, state } -> upsert
 *
 * Cần đăng nhập. Khách (chưa đăng nhập) KHÔNG lưu ở đây (SDK tự dùng localStorage).
 */
export const onRequestGet: PagesFunction = async (ctx) => {
  const user = await getSessionUser(ctx);
  if (!user) return json({ ok: true, loggedIn: false, progress: null, items: [] });
  const { env } = ctx as any;
  const url = new URL(ctx.request.url);
  const game = url.searchParams.get("game");

  try {
    if (game) {
      const row = await env.DB.prepare(
        `SELECT game_id, status, best_level, best_score, state_json, updated_at
         FROM plays_progress WHERE user_id = ? AND game_id = ?`
      ).bind(user.uid, game).first<any>();
      return json({ ok: true, loggedIn: true, progress: row ? mapRow(row) : null });
    }
    const res = await env.DB.prepare(
      `SELECT game_id, status, best_level, best_score, updated_at
       FROM plays_progress WHERE user_id = ? ORDER BY updated_at DESC`
    ).bind(user.uid).all<any>();
    return json({ ok: true, loggedIn: true, items: (res.results || []).map(mapRow) });
  } catch (e: any) {
    return bad(500, "db_error", String(e?.message || e));
  }
};

export const onRequestPost: PagesFunction = async (ctx) => {
  const user = await getSessionUser(ctx);
  if (!user) return bad(401, "unauthorized", "Cần đăng nhập để lưu tiến trình.");
  const { env } = ctx as any;

  let body: any = {};
  try { body = await ctx.request.json(); } catch {}
  const game = String(body.game || "").slice(0, 64);
  if (!game) return bad(400, "bad_game", "Thiếu game id.");

  const status = ["unplayed", "playing", "played"].includes(body.status) ? body.status : "playing";
  const level = Math.max(0, Math.floor(Number(body.level) || 0));
  const score = Math.max(0, Math.floor(Number(body.score) || 0));
  const state = body.state != null ? JSON.stringify(body.state).slice(0, 8000) : null;
  const now = Date.now();

  try {
    await ensureProfile(env, user.uid, user.email);
    // upsert: giữ best_level/best_score lớn hơn
    await env.DB.prepare(
      `INSERT INTO plays_progress (user_id, game_id, status, best_level, best_score, state_json, plays_count, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, 1, ?)
       ON CONFLICT(user_id, game_id) DO UPDATE SET
         status = excluded.status,
         best_level = MAX(plays_progress.best_level, excluded.best_level),
         best_score = MAX(plays_progress.best_score, excluded.best_score),
         state_json = excluded.state_json,
         plays_count = plays_progress.plays_count + 1,
         updated_at = excluded.updated_at`
    ).bind(user.uid, game, status, level, score, state, now).run();

    const row = await env.DB.prepare(
      `SELECT game_id, status, best_level, best_score, state_json, updated_at
       FROM plays_progress WHERE user_id = ? AND game_id = ?`
    ).bind(user.uid, game).first<any>();
    return json({ ok: true, progress: mapRow(row) });
  } catch (e: any) {
    return bad(500, "db_error", String(e?.message || e));
  }
};

function mapRow(r: any) {
  return {
    gameId: r.game_id,
    status: r.status,
    level: r.best_level,
    score: r.best_score,
    state: r.state_json ? safeParse(r.state_json) : null,
    updatedAt: r.updated_at,
  };
}
function safeParse(s: string) { try { return JSON.parse(s); } catch { return null; } }
