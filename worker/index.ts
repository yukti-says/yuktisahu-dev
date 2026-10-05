// Cloudflare Worker entry: serves the two live-feed endpoints. Every other request is
// answered directly from the built site in ./dist (see wrangler.jsonc).
import { onRequestGet as writing } from '../functions/api/writing'
import { onRequestGet as github } from '../functions/api/github'

export default {
  async fetch(request: Request, env: unknown, ctx: { waitUntil(p: Promise<unknown>): void }) {
    const { pathname } = new URL(request.url)
    const context = { request, env, waitUntil: (p: Promise<unknown>) => ctx.waitUntil(p) }

    if (pathname === '/api/writing') return writing(context)
    if (pathname === '/api/github') return github(context)
    return new Response('Not found', { status: 404 })
  },
}
