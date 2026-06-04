export async function onRequest(context: any) {
  try {
    return await context.next();
  } catch (err: any) {
    return new Response(JSON.stringify({ ok: false, error: String(err?.message || err) }), {
      status: 500,
      headers: { "content-type": "application/json" }
    });
  }
}
