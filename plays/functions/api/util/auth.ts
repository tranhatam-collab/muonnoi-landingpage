import { verifySession } from "./session";

/**
 * Lấy user phiên hiện tại.
 * Ưu tiên ctx.data.user (do _middleware.ts gắn). Nếu chưa có, tự verify cookie.
 * => endpoint plays chạy được dù middleware auth chưa bật.
 */
export async function getSessionUser(ctx: any): Promise<{ uid: string; email: string } | null> {
  const fromMw = ctx?.data?.user;
  if (fromMw?.uid) return fromMw;

  try {
    const env = ctx.env;
    if (!env?.SESSION_COOKIE || !env?.AUTH_SECRET) return null;
    const cookie = ctx.request.headers.get("Cookie") || "";
    const pair = cookie.split(";").map((s: string) => s.trim())
      .find((s: string) => s.startsWith(env.SESSION_COOKIE + "="));
    if (!pair) return null;
    const token = decodeURIComponent(pair.split("=")[1] || "");
    const payload = await verifySession(token, env.AUTH_SECRET).catch(() => null);
    return payload?.uid ? { uid: payload.uid, email: payload.email } : null;
  } catch {
    return null;
  }
}

/** Đảm bảo hồ sơ plays tồn tại cho user (auto-link tài khoản muonnoi.org). */
export async function ensureProfile(env: any, uid: string, email?: string): Promise<void> {
  const now = Date.now();
  await env.DB.prepare(
    `INSERT INTO plays_profiles (user_id, display_name, points_balance, created_at, updated_at)
     VALUES (?, ?, 0, ?, ?)
     ON CONFLICT(user_id) DO UPDATE SET updated_at = excluded.updated_at`
  ).bind(uid, email ? email.split("@")[0] : null, now, now).run();
}
