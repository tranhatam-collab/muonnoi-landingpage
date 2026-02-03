export function json(data: any, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { "content-type": "application/json; charset=utf-8", ...(init.headers || {}) },
  });
}

export function bad(status: number, code: string, message: string) {
  return json({ ok: false, code, message }, { status });
}

export function requireUser(ctx: any) {
  const user = ctx.data?.user;
  if (!user?.uid) return null;
  return user;
}

export function isAdmin(email: string, adminEmailsCsv: string) {
  const list = adminEmailsCsv.split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
  return list.includes(email.toLowerCase());
}

export function normalizeUrl(input: string) {
  try {
    const u = new URL(input);
    u.hash = "";
    return u.toString();
  } catch {
    return "";
  }
}

export function domainOf(url: string) {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return "";
  }
}
