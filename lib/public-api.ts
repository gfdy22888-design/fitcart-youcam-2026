import { GITHUB_PAGES_ORIGIN } from "./public-config";

const windows = new Map<string, {count: number; until: number}>();
export function allowedOrigin(request: Request) {
  const origin = request.headers.get("Origin");
  return !origin || origin === new URL(request.url).origin || origin === GITHUB_PAGES_ORIGIN;
}
export function publicApiGuard(request: Request): Response | null {
  if (!allowedOrigin(request)) return Response.json({error:"This origin is not allowed."}, {status:403});
  if (request.method === "OPTIONS") return new Response(null, {status:204});
  // Best-effort per-isolate abuse protection for the shared demo account.
  // A visitor's own key never falls back to the shared account.
  if (request.method === "POST" && new URL(request.url).pathname === "/api/try-on" && !request.headers.get("X-YouCam-Key")?.trim()) {
    const now = Date.now();
    for (const [key,value] of windows) if(value.until < now) windows.delete(key);
    const key = request.headers.get("cf-connecting-ip") || "unknown";
    const entry = windows.get(key) || {count:0,until:now+10*60*1000};
    if(entry.count >= 3) return Response.json({error:"Please wait a few minutes before generating another live preview, or connect your own YouCam key. Recorded examples remain available."},{status:429,headers:{"Retry-After":"600"}});
    entry.count++; windows.set(key,entry);
  }
  return null;
}
export function withPublicCors(request: Request, response: Response) {
  const origin = request.headers.get("Origin");
  if (!origin || !allowedOrigin(request)) return response;
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin",origin);
  headers.set("Access-Control-Allow-Methods","GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers","Content-Type, X-YouCam-Key");
  headers.set("Access-Control-Max-Age","600");
  const vary = headers.get("Vary");
  headers.set("Vary",vary ? vary+", Origin" : "Origin");
  return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
}
