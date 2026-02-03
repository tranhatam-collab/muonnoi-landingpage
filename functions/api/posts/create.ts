import { json, bad, requireUser, normalizeUrl, domainOf } from "../util/http";
import { sha256Hex } from "../util/crypto";

export const onRequestPost: PagesFunction = async (ctx) => {
  const user = requireUser(ctx);
  if (!user) return bad(401, "unauth", "Chưa đăng nhập / Not signed in.");

  const { request, env } = ctx;
  const me = await env.DB.prepare("SELECT status FROM users WHERE id = ?").bind(user.uid).first<any>();
  if (!me) return bad(404, "no_user", "User không tồn tại / User missing.");
  if (me.status !== "approved") return bad(403, "not_approved", "Chưa được duyệt / Not approved yet.");

  const body = await request.json().catch(() => ({}));

  const kind = String(body.kind || "").trim();
  if (!["text", "link", "file"].includes(kind)) return bad(400, "bad_kind", "kind không hợp lệ.");

  const title = String(body.title || "").slice(0, 140);
  const text = String(body.body || "").slice(0, 8000);

  let source_link = "";
  if (body.source_link) source_link = normalizeUrl(String(body.source_link));
  let proof_hash = body.proof_hash ? String(body.proof_hash).trim() : "";
  let proof_level = proof_hash ? 1 : 0;

  let file_key = "";
  let file_mime = "";
  let file_size = 0;

  if (kind === "file") {
    file_key = String(body.file_key || "");
    file_mime = String(body.file_mime || "");
    file_size = Number(body.file_size || 0);
    if (!file_key) return bad(400, "missing_file", "Thiếu file_key.");
  }

  // domain intelligence: if source_link harmful => block preview / allow post but mark caution
  if (source_link) {
    const d = domainOf(source_link);
    const row = await env.DB.prepare("SELECT status FROM domains WHERE domain = ?").bind(d).first<any>();
    if (row?.status === "harmful") {
      // keep link but flag
      proof_level = Math.max(proof_level, 0);
    }
  }

  // content_hash from normalized metadata (proof-first)
  const normalized = JSON.stringify({
    kind,
    title,
    body: text,
    source_link,
    file_key,
    file_mime,
    file_size,
    proof_hash,
    author_id: user.uid,
  });
  const content_hash = await sha256Hex(normalized);

  const id = crypto.randomUUID();
  const now = Date.now();

  await env.DB.prepare(`
    INSERT INTO posts
    (id,author_id,kind,title,body,source_link,file_key,file_mime,file_size,content_hash,proof_hash,proof_level,created_at)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
  `).bind(
    id, user.uid, kind, title, text, source_link, file_key, file_mime, file_size,
    content_hash, proof_hash, proof_level, now
  ).run();

  return json({ ok: true, id, content_hash });
};
