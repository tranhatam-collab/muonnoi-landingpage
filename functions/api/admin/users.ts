import { json, bad, requireUser, isAdmin } from "../util/http";

export const onRequestGet: PagesFunction = async (ctx) => {
  const u = requireUser(ctx);
  if (!u) return bad(401, "unauth", "Unauth.");
  if (!isAdmin(u.email, ctx.env.ADMIN_EMAILS)) return bad(403, "forbidden", "Forbidden.");

  const rows = await ctx.env.DB.prepare("SELECT id,email,status,created_at,approved_at,last_login_at FROM users ORDER BY created_at DESC LIMIT 200")
    .all<any>();
  return json({ ok: true, items: rows.results || [] });
};

export const onRequestPost: PagesFunction = async (ctx) => {
  const u = requireUser(ctx);
  if (!u) return bad(401, "unauth", "Unauth.");
  if (!isAdmin(u.email, ctx.env.ADMIN_EMAILS)) return bad(403, "forbidden", "Forbidden.");

  const body = await ctx.request.json().catch(() => ({}));
  const id = String(body.id || "");
  const status = String(body.status || "");
  if (!id || !["pending", "approved", "blocked"].includes(status)) return bad(400, "bad", "Bad.");

  const now = Date.now();
  await ctx.env.DB.prepare("UPDATE users SET status = ?, approved_at = CASE WHEN ?='approved' THEN ? ELSE approved_at END WHERE id = ?")
    .bind(status, status, now, id).run();

  return json({ ok: true });
};
