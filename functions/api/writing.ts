// Live feed of Yukti's articles from Dev.to (tech) and Medium (life reflections).
// Runs as a Cloudflare Pages Function (served at /api/writing) so there are no CORS
// problems and the site's CSP (connect-src 'self') stays locked down. New posts appear
// automatically — the response is cached at the edge for 10 minutes, so there's
// nothing to redeploy.
import { cachedJson } from '../_lib/cache'

const DEVTO_USER = 'yuktisays'
const MEDIUM_USER = 'Yuktisahu345'

interface Item {
  id: string
  source: 'devto' | 'medium'
  title: string
  excerpt: string
  url: string
  date: string
  readingTime: number
  tags: string[]
}

function decodeEntities(s: string) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
}

function stripHtml(html: string) {
  return decodeEntities(html.replace(/<figure[\s\S]*?<\/figure>/g, ' ').replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim()
}

function tag(block: string, name: string) {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))
  if (!m) return ''
  return m[1].replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim()
}

async function fromDevto(): Promise<Item[]> {
  const res = await fetch(`https://dev.to/api/articles?username=${DEVTO_USER}&per_page=50`, {
    headers: { Accept: 'application/json', 'User-Agent': 'yukti-portfolio' },
  })
  if (!res.ok) return []
  const list: any[] = await res.json()
  return list.map((a) => ({
    id: `devto-${a.id}`,
    source: 'devto',
    title: a.title,
    excerpt: a.description || '',
    url: a.url,
    date: a.published_at || a.created_at,
    readingTime: a.reading_time_minutes || 1,
    tags: Array.isArray(a.tag_list) ? a.tag_list : String(a.tag_list || '').split(',').map((t: string) => t.trim()).filter(Boolean),
  }))
}

async function fromMedium(): Promise<Item[]> {
  const res = await fetch(`https://medium.com/feed/@${MEDIUM_USER}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; yukti-portfolio)' },
  })
  if (!res.ok) return []
  const xml = await res.text()
  const blocks = xml.split('<item>').slice(1)
  return blocks.map((b) => {
    const link = tag(b, 'link').split('?')[0]
    const body = stripHtml(tag(b, 'content:encoded'))
    const words = body.split(' ').filter(Boolean).length
    const tags = Array.from(b.matchAll(/<category>([\s\S]*?)<\/category>/g)).map((m) =>
      m[1].replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim(),
    )
    return {
      id: `medium-${link}`,
      source: 'medium' as const,
      title: decodeEntities(tag(b, 'title')),
      excerpt: body.length > 180 ? body.slice(0, 180).replace(/\s+\S*$/, '') + '…' : body,
      url: link,
      date: new Date(tag(b, 'pubDate')).toISOString(),
      readingTime: Math.max(1, Math.round(words / 200)),
      tags,
    }
  })
}

export const onRequestGet = async (ctx: any) =>
  cachedJson(ctx.request, ctx, 600, async () => {
    const [devto, medium] = await Promise.allSettled([fromDevto(), fromMedium()])
    const items = [
      ...(devto.status === 'fulfilled' ? devto.value : []),
      ...(medium.status === 'fulfilled' ? medium.value : []),
    ].sort((a, b) => +new Date(b.date) - +new Date(a.date))
    // Don't cache an empty list: it usually means a source was briefly unreachable.
    return { body: items, skipCache: items.length === 0 }
  })
