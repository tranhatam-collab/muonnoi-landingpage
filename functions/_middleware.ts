export async function onRequest(context: any, next: any) {
  try {
    return await next();
  } catch (err) {
    // fail-open: never crash the whole site
    return await next();
  }
}
