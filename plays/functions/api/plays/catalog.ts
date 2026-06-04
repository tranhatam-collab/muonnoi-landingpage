import { json } from "../util/http";

/**
 * GET /api/plays/catalog  -> { ok, games, counts }
 *
 * Giai đoạn đầu: frontend dùng /plays/assets/catalog.js (tĩnh, CDN, nhanh).
 * Endpoint này đọc bảng plays_catalog nếu đã seed (cho phép bật/tắt game động).
 * Nếu bảng trống/chưa có -> trả mảng rỗng + hint để client fallback sang catalog.js.
 */
export const onRequestGet: PagesFunction = async (ctx) => {
  const { env } = ctx as any;
  try {
    const res = await env.DB.prepare(
      `SELECT game_id, name, genre, status, sort FROM plays_catalog ORDER BY sort ASC, name ASC`
    ).all<any>();
    const games = (res.results || []).map((r: any) => ({
      id: r.game_id, n: r.name, g: r.genre, status: r.status,
    }));
    return json({
      ok: true,
      source: games.length ? "db" : "static",
      games,
      counts: {
        total: games.length,
        live: games.filter((g: any) => g.status === "live").length,
        wave1: games.filter((g: any) => g.status === "wave1" || g.status === "live").length,
      },
    });
  } catch {
    // bảng chưa tạo -> để client dùng catalog.js tĩnh
    return json({ ok: true, source: "static", games: [], counts: {} });
  }
};
