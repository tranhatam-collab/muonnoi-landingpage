import { json, bad, requireUser, isAdmin } from "../util/http";

export const onRequestGet: PagesFunction = async (ctx) => {
  const u = requireUser(ctx);
  if (!u) return bad(401, "unauth", "Unauth.");
  if (!isAdmin(u.email, ctx.env.ADMIN_EMAILS)) return bad(403, "forbidden", "Forbidden.");

  const rows = await ctx.env.DB.prepare("SELECT domain,status,note,updated_at FROM domains ORDER BY updated_at DESC LIMIT 500")
    .all<any>();
  return json({ ok: true, items: rows.results || [] });
};

export const onRequestPost: PagesFunction = async (ctx) => {
  const u = requireUser(ctx);
  if (!u) return bad(401, "unauth", "Unauth.");
  if (!isAdmin(u.email, ctx.env.ADMIN_EMAILS)) return bad(403, "forbidden", "Forbidden.");

  const body = await ctx.request.json().catch(() => ({}));
  const domain = String(body.domain || "").toLowerCase().trim();
  const status = String(body.status || "");
  const note = String(body.note || "").slice(0, 200);

  if (!domain || !["trusted", "neutral", "harmful"].includes(status)) return bad(400, "bad", "Bad.");

  await ctx.env.DB.prepare(`
    INSERT INTO domains (domain,status,note,updated_at)
    VALUES (?,?,?,?)
    ON CONFLICT(domain) DO UPDATE SET status=excluded.status, note=excluded.note, updated_at=excluded.updated_at
  `).bind(domain, status, note, Date.now()).run();

  return json({ ok: true });
};
