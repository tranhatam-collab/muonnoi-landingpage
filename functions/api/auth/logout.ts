import { json } from "../util/http";
import { clearCookie } from "../util/session";

export const onRequestPost: PagesFunction = async (ctx) => {
  const { env } = ctx;
  const headers = new Headers();
  headers.set("Set-Cookie", clearCookie(env.SESSION_COOKIE));
  return json({ ok: true }, { headers });
};
