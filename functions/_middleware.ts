import { verifySession } from "./api/util/session";

export async function onRequest(context: any, next: any) {
  const { request, env } = context;

  // Attach user if session cookie exists
  const cookie = request.headers.get("Cookie") || "";
  const session = cookie.split(";").map(s => s.trim()).find(s => s.startsWith(env.SESSION_COOKIE + "="));
  if (session) {
    const token = decodeURIComponent(session.split("=")[1] || "");
    const payload = await verifySession(token, env.AUTH_SECRET);
    if (payload?.uid) {
      context.data.user = payload; // { uid, email, exp }
    }
  }

  return next();
}
