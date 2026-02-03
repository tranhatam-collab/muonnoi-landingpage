import { json, bad, requireUser } from "../util/http";

export const onRequestPost: PagesFunction = async (ctx) => {
  const user = requireUser(ctx);
  if (!user) return bad(401, "unauth", "Chưa đăng nhập / Not signed in.");

  const { request, env } = ctx;
  const body = await request.json().catch(() => ({}));
  const post_id = String(body.post_id || "");
  const reason = String(body.reason || "").slice(0, 500);
  if (!post_id || !reason) return bad(400, "bad", "Thiếu dữ liệu / Missing.");

  const id = crypto.randomUUID();
  await env.DB.prepare("INSERT INTO flags (id,post_id,reporter_id,reason,created_at) VALUES (?,?,?,?,?)")
    .bind(id, post_id, user.uid, reason, Date.now()).run();

  // Soft action: set ai_flag=caution (still not deletion)
  await env.DB.prepare("UPDATE posts SET ai_flag = 'caution' WHERE id = ?").bind(post_id).run();

  return json({ ok: true });
};
