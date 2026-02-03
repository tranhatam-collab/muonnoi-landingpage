import { json, bad } from "../util/http";
import { hmacVerify } from "../util/crypto";
import { createSession, setCookie } from "../util/session";

export const onRequestGet: PagesFunction = async (ctx) => {
  const { request, env } = ctx;
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  if (!token) return bad(400, "missing_token", "Thiếu token / Missing token.");

  let decoded = "";
  try {
    decoded = decodeURIComponent(escape(atob(token)));
  } catch {
    return bad(400, "bad_token", "Token lỗi / Invalid token.");
  }

  const parts = decoded.split("|");
  if (parts.length < 4) return bad(400, "bad_token", "Token lỗi / Invalid token.");
  const email = parts[0];
  const uid = parts[1];
  const exp = Number(parts[2]);
  const sig = parts.slice(3).join("|");

  if (!email || !uid || !exp || !sig) return bad(400, "bad_token", "Token lỗi / Invalid token.");
  if (Date.now() > exp) return bad(400, "expired", "Token hết hạn / Token expired.");

  const msg = `${email}|${uid}|${exp}`;
  const ok = await hmacVerify(msg, sig, env.AUTH_SECRET);
  if (!ok) return bad(400, "bad_sig", "Token sai chữ ký / Bad signature.");

  // check user + status
  const user = await env.DB.prepare("SELECT id,email,status FROM users WHERE id = ? AND email = ?")
    .bind(uid, email.toLowerCase()).first<any>();
  if (!user) return bad(404, "user_not_found", "Không tìm thấy user / User not found.");

  if (user.status === "blocked") return bad(403, "blocked", "Tài khoản bị chặn / Account blocked.");

  // update login time
  await env.DB.prepare("UPDATE users SET last_login_at = ? WHERE id = ?").bind(Date.now(), uid).run();

  // session 7 days
  const session = await createSession({ uid, email: user.email, exp: Date.now() + 7 * 24 * 3600 * 1000 }, env.AUTH_SECRET);

  const headers = new Headers();
  headers.set("Set-Cookie", setCookie(env.SESSION_COOKIE, session, 7 * 24 * 3600));
  headers.set("Location", `${env.APP_ORIGIN}/app.html`);
  return new Response(null, { status: 302, headers });
};
