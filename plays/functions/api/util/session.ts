import { base64UrlEncode, base64UrlDecode, hmacSign, hmacVerify } from "./crypto";

type SessionPayload = { uid: string; email: string; exp: number };

export async function createSession(payload: SessionPayload, secret: string): Promise<string> {
  const body = base64UrlEncode(new TextEncoder().encode(JSON.stringify(payload)));
  const sig = await hmacSign(body, secret);
  return `${body}.${sig}`;
}

export async function verifySession(token: string, secret: string): Promise<SessionPayload | null> {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const ok = await hmacVerify(body, sig, secret);
  if (!ok) return null;

  const json = new TextDecoder().decode(base64UrlDecode(body));
  const payload = JSON.parse(json) as SessionPayload;
  if (!payload?.uid || !payload?.exp) return null;
  if (Date.now() > payload.exp) return null;
  return payload;
}

export function setCookie(name: string, value: string, maxAgeSeconds: number) {
  const secure = "Secure; SameSite=Lax; Path=/";
  return `${name}=${encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; HttpOnly; ${secure}`;
}

export function clearCookie(name: string) {
  const secure = "Secure; SameSite=Lax; Path=/";
  return `${name}=; Max-Age=0; HttpOnly; ${secure}`;
}
