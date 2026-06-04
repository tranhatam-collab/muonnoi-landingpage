import { json, bad } from "../util/http";
import { getSessionUser, ensureProfile } from "../util/auth";

/**
 * POST /api/plays/consent  body: { version }
 * Ghi nhận thành viên đã đồng ý Điều khoản/Quyền riêng tư phiên bản nào (nhật ký đồng ý).
 * Khách (chưa đăng nhập) lưu đồng ý ở localStorage phía client; không gọi tới đây.
 */
export const onRequestPost: PagesFunction = async (ctx) => {
  const user = await getSessionUser(ctx);
  if (!user) return json({ ok: true, loggedIn: false }); // không bắt buộc với khách
  const { env } = ctx as any;
  let b: any = {};
  try { b = await ctx.request.json(); } catch {}
  const version = String(b.version || "").slice(0, 32);
  if (!version) return bad(400, "bad_version", "Thiếu version.");
  try {
    await ensureProfile(env, user.uid, user.email);
    await env.DB.prepare(
      `INSERT INTO plays_consents (id, user_id, version, created_at) VALUES (?, ?, ?, ?)`
    ).bind(crypto.randomUUID(), user.uid, version, Date.now()).run();
    return json({ ok: true });
  } catch (e: any) {
    return json({ ok: true, note: "log_skipped" });
  }
};
