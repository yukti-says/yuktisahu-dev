// Browser-side fallbacks for the live feeds. If the /api functions aren't available
// (local `npm run dev`, a static host, or a rate-limited server), the page fetches the
// same data straight from Dev.to, GitHub and Medium (through rss2json, a free RSS-to-JSON
// service, because Medium's feed can't be read directly from a browser).
import { Repo, WritingItem } from '../types'

const DEVTO_USER = 'yuktisays'
const MEDIUM_USER = 'Yuktisahu345'
const GITHUB_USER = 'yukti-says'

const decode = (s: string) => {
  const el = document.createElement('textarea')
  el.innerHTML = s
  return el.value
}

const stripHtml = (html: string) =>
  decode(html.replace(/<figure[\s\S]*?<\/figure>/g, ' ').replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim()

async function getJson(url: string) {
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(String(res.status))
  return res.json()
}

async function devto(): Promise<WritingItem[]> {
  const list: any[] = await getJson(`https://dev.to/api/articles?username=${DEVTO_USER}&per_page=50`)
  return list.map((a) => ({
    id: `devto-${a.id}`,
    source: 'devto' as const,
    title: a.title,
    excerpt: a.description || '',
    url: a.url,
    date: a.published_at || a.created_at,
    readingTime: a.reading_time_minutes || 1,
    tags: Array.isArray(a.tag_list) ? a.tag_list : String(a.tag_list || '').split(',').map((t: string) => t.trim()).filter(Boolean),
  }))
}

async function medium(): Promise<WritingItem[]> {
  const feed = encodeURIComponent(`https://medium.com/feed/@${MEDIUM_USER}`)
  const json = await getJson(`https://api.rss2json.com/v1/api.json?rss_url=${feed}`)
  if (json.status !== 'ok') throw new Error('medium')
  return (json.items as any[]).map((i) => {
    const body = stripHtml(i.content || i.description || '')
    const words = body.split(' ').filter(Boolean).length
    const link = String(i.link).split('?')[0]
    return {
      id: `medium-${link}`,
      source: 'medium' as const,
      title: decode(i.title),
      excerpt: body.length > 180 ? body.slice(0, 180).replace(/\s+\S*$/, '') + '…' : body,
      url: link,
      date: new Date(String(i.pubDate).replace(' ', 'T') + 'Z').toISOString(),
      readingTime: Math.max(1, Math.round(words / 200)),
      tags: i.categories || [],
    }
  })
}

export async function fetchWritingDirect(): Promise<WritingItem[]> {
  const [d, m] = await Promise.allSettled([devto(), medium()])
  if (d.status === 'rejected' && m.status === 'rejected') throw new Error('writing')
  return [...(d.status === 'fulfilled' ? d.value : []), ...(m.status === 'fulfilled' ? m.value : [])].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date),
  )
}

export async function fetchReposDirect(): Promise<Repo[]> {
  const repos: any[] = await getJson(
    `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed&type=owner`,
  )
  return repos
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
}
