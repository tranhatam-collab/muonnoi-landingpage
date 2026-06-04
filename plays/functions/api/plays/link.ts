import { json, bad } from "../util/http";
import { getSessionUser, ensureProfile } from "../util/auth";

/**
 * POST /api/plays/link  -> auto-link tài khoản muonnoi.org vào plays.
 * GET  /api/plays/link  -> trạng thái hồ sơ plays hiện tại.
 *
 * Gọi khi thành viên vào plays lần đầu: tạo plays_profiles dùng chung users.id.
 * Nhờ vậy "mọi thành viên đăng ký muonnoi.org đều được link trực tiếp tới Game".
 */
export const onRequestGet: PagesFunction = async (ctx) => {
  const user = await getSessionUser(ctx);
  if (!user) return json({ ok: true, loggedIn: false, profile: null });
  const { env } = ctx as any;
  try {
    await ensureProfile(env, user.uid, user.email);
    const profile = await env.DB.prepare(
      `SELECT user_id, display_name, points_balance, created_at FROM plays_profiles WHERE user_id = ?`
    ).bind(user.uid).first<any>();
    return json({ ok: true, loggedIn: true, profile });
  } catch (e: any) {
    return bad(500, "db_error", String(e?.message || e));
  }
};

export const onRequestPost: PagesFunction = async (ctx) => {
  const user = await getSessionUser(ctx);
  if (!user) return bad(401, "unauthorized", "Cần đăng nhập.");
  const { env } = ctx as any;
  try {
    await ensureProfile(env, user.uid, user.email);
    return json({ ok: true, linked: true });
  } catch (e: any) {
    return bad(500, "db_error", String(e?.message || e));
  }
};
