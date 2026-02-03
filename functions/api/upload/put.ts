import { json, bad, requireUser } from "../util/http";
import { sha256Hex } from "../util/crypto";

export const onRequestPost: PagesFunction = async (ctx) => {
  const user = requireUser(ctx);
  if (!user) return bad(401, "unauth", "Chưa đăng nhập / Not signed in.");

  const { request, env } = ctx;
  const contentType = request.headers.get("content-type") || "application/octet-stream";
  const size = Number(request.headers.get("x-file-size") || "0");

  if (!size || size > 25 * 1024 * 1024) return bad(400, "bad_size", "File tối đa 25MB / Max 25MB.");

  const buf = await request.arrayBuffer();
  const hash = await sha256Hex(buf);
  const key = `u/${user.uid}/${Date.now()}_${hash}`;

  await env.BUCKET.put(key, buf, { httpMetadata: { contentType } });

  return json({ ok: true, key, contentType, size, content_hash: hash });
};
