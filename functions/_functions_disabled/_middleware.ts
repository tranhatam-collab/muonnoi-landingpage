import { verifySession } from "./api/util/session";

export async function onRequest(context: any, next: any) {
  try {
    const { request, env } = context;

    // Nếu thiếu env tối thiểu, vẫn cho qua để site không chết
    if (!env || !env.SESSION_COOKIE || !env.AUTH_SECRET) {
      return next();
    }

    const cookie = request.headers.get("Cookie") || "";
    const sessionPair = cookie
      .split(";")
      .map((s) => s.trim())
      .find((s) => s.startsWith(env.SESSION_COOKIE + "="));

    if (sessionPair) {
      const token = decodeURIComponent(sessionPair.split("=")[1] || "");
      const payload = await verifySession(token, env.AUTH_SECRET).catch(() => null);
      if (payload?.uid) context.data.user = payload;
    }

    return next();
  } catch (err) {
    // Fail-open: đừng để middleware làm sập toàn site
    return next();
  }
}
