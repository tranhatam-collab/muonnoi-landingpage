import { json } from "../util/http";

export const onRequestGet: PagesFunction = async (ctx) => {
  const { env } = ctx;
  const u = ctx.data?.user;
  if (!u?.uid) return json({ ok: true, user: null });

  const row = await env.DB.prepare("SELECT id,email,status,created_at,approved_at,wallet_slot FROM users WHERE id = ?")
    .bind(u.uid).first<any>();

  return json({ ok: true, user: row || null });
};
