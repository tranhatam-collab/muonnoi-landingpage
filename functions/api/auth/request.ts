import { json, bad } from "../util/http";
import { hmacSign } from "../util/crypto";

export const onRequestPost: PagesFunction = async (ctx) => {
  const { request, env } = ctx;
  const body = await request.json().catch(() => ({}));
  const email = String(body.email || "").trim().toLowerCase();

  if (!email || !email.includes("@")) return bad(400, "invalid_email", "Email không hợp lệ / Invalid email.");

  // upsert user
  const now = Date.now();
  const uid = await ensureUser(ctx, email, now);

  // magic token: email|uid|exp signed
  const exp = now + 15 * 60 * 1000;
  const msg = `${email}|${uid}|${exp}`;
  const sig = await hmacSign(msg, env.AUTH_SECRET);
  const token = btoa(unescape(encodeURIComponent(`${msg}|${sig}`)));

  const link = `${env.APP_ORIGIN}/functions/api/auth/callback?token=${encodeURIComponent(token)}`;

  // send via Resend
  const subject = `${env.APP_NAME_VI} / ${env.APP_NAME_EN} – Magic Link`;
  const html = `
  <div style="font-family:ui-sans-serif,system-ui;line-height:1.5">
    <h2 style="margin:0 0 8px 0">${env.APP_NAME_VI} · ${env.APP_NAME_EN}</h2>
    <p style="margin:0 0 12px 0">Bấm để đăng nhập (15 phút):</p>
    <p><a href="${link}" style="display:inline-block;padding:10px 14px;border-radius:10px;background:#111;color:#fff;text-decoration:none">Đăng nhập / Sign in</a></p>
    <p style="color:#666;margin-top:16px">Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>
  </div>`;

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: env.MAIL_FROM,
      to: [email],
      subject,
      html,
    }),
  });

  if (!r.ok) {
    const t = await r.text().catch(() => "");
    return bad(500, "email_failed", `Gửi email thất bại / Email failed. ${t}`);
  }

  return json({ ok: true });
};

async function ensureUser(ctx: any, email: string, now: number): Promise<string> {
  const { env } = ctx;
  const id = crypto.randomUUID();
  const existing = await env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(email).first<any>();
  if (existing?.id) return existing.id;

  await env.DB.prepare(
    "INSERT INTO users (id,email,status,created_at) VALUES (?,?, 'pending', ?)"
  ).bind(id, email, now).run();

  return id;
}
