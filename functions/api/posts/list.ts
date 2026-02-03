import { json, bad, domainOf } from "../util/http";

export const onRequestGet: PagesFunction = async (ctx) => {
  const { request, env } = ctx;
  const url = new URL(request.url);
  const cursor = Number(url.searchParams.get("cursor") || "0"); // created_at
  const limit = Math.min(30, Math.max(5, Number(url.searchParams.get("limit") || "15")));

  let q = `
    SELECT p.*, u.email as author_email
    FROM posts p
    JOIN users u ON u.id = p.author_id
    ORDER BY p.created_at DESC
    LIMIT ?
  `;
  let bind: any[] = [limit];

  if (cursor > 0) {
    q = `
      SELECT p.*, u.email as author_email
      FROM posts p
      JOIN users u ON u.id = p.author_id
      WHERE p.created_at < ?
      ORDER BY p.created_at DESC
      LIMIT ?
    `;
    bind = [cursor, limit];
  }

  const rows = await env.DB.prepare(q).bind(...bind).all<any>();
  const items = rows.results || [];

  // attach domain status (no heavy logic)
  const domains = new Map<string, string>();
  for (const it of items) {
    if (it.source_link) {
      const d = domainOf(it.source_link);
      if (!domains.has(d)) {
        const r = await env.DB.prepare("SELECT status FROM domains WHERE domain = ?").bind(d).first<any>();
        domains.set(d, r?.status || "neutral");
      }
      it.domain_status = domains.get(d);
    }
  }

  const nextCursor = items.length ? items[items.length - 1].created_at : null;
  return json({ ok: true, items, nextCursor });
};
