// Tiny helper: cache a JSON response at Cloudflare's edge so Dev.to, Medium and
// GitHub are only hit once every few minutes, however many people visit.
export async function cachedJson(
  request: Request,
  ctx: { waitUntil: (p: Promise<unknown>) => void },
  seconds: number,
  build: () => Promise<{ body: unknown; status?: number; skipCache?: boolean }>,
): Promise<Response> {
  const cache = (caches as any).default as Cache
  const key = new Request(new URL(request.url).toString(), { method: 'GET' })

  const hit = await cache.match(key)
  if (hit) return hit

  const { body, status = 200, skipCache = false } = await build()
  const cacheable = status === 200 && !skipCache
  const res = new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // Browsers keep it 1 minute; Cloudflare's edge keeps it for `seconds`.
      'Cache-Control': cacheable ? `public, max-age=60, s-maxage=${seconds}` : 'no-store',
    },
  })
  if (cacheable) ctx.waitUntil(cache.put(key, res.clone()))
  return res
}
