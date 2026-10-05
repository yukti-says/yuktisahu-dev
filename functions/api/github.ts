// Live list of public GitHub repositories for github.com/yukti-says.
// Forks and archived repos are skipped, and so is the profile README repo.
// Optional: set GITHUB_TOKEN in Cloudflare (Settings → Variables) to raise the API
// rate limit (not required).
import { cachedJson } from '../_lib/cache'

const GITHUB_USER = 'yukti-says'

export const onRequestGet = async (ctx: any) =>
  cachedJson(ctx.request, ctx, 600, async () => {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'yukti-portfolio',
    }
    if (ctx.env?.GITHUB_TOKEN) headers.Authorization = `Bearer ${ctx.env.GITHUB_TOKEN}`

    try {
      const r = await fetch(
        `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed&type=owner`,
        { headers },
      )
      if (!r.ok) throw new Error(String(r.status))
      const repos: any[] = await r.json()

      const body = repos
        .filter((x) => !x.fork && !x.archived && x.name.toLowerCase() !== GITHUB_USER)
        .map((x) => ({
          id: x.id,
          name: x.name,
          description: x.description || '',
          url: x.html_url,
          homepage: x.homepage || '',
          language: x.language || '',
          topics: x.topics || [],
          stars: x.stargazers_count,
          pushedAt: x.pushed_at,
        }))
      return { body }
    } catch {
      return { body: { error: 'GitHub unavailable' }, status: 502 }
    }
  })
