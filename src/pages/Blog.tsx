import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import Seo from '../components/ui/Seo'
import ArticleCard from '../components/ui/ArticleCard'
import { useApiData } from '../hooks/useApiData'
import { fetchWritingDirect } from '../lib/feeds'
import { WritingItem } from '../types'

const tabs = [
  { id: 'devto' as const, label: 'Tech', sub: 'Dev.to', blurb: 'Code, concepts, and things I learn while building.', href: 'https://dev.to/yuktisays' },
  { id: 'medium' as const, label: 'Life & Reflections', sub: 'Medium', blurb: 'Personal growth, psychology, and everyday observations.', href: 'https://medium.com/@Yuktisahu345' },
]

export default function Blog() {
  const { data: items, status } = useApiData<WritingItem>('/api/writing', fetchWritingDirect)
  const [active, setActive] = useState<'devto' | 'medium'>('devto')
  const [query, setQuery] = useState('')

  const tab = tabs.find((t) => t.id === active)!
  const counts = useMemo(
    () => ({
      devto: items.filter((i) => i.source === 'devto').length,
      medium: items.filter((i) => i.source === 'medium').length,
    }),
    [items],
  )

  const q = query.trim().toLowerCase()
  const filtered = items.filter(
    (p) =>
      p.source === active &&
      (q === '' || p.title.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))),
  )

  return (
    <>
      <Seo title="Writing" description="Technical articles from Dev.to and personal reflections from Medium, by Yukti Sahu." />
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <p className="catalog-tab mb-4">File No. 020 — Field Notes</p>
        <h1 className="text-4xl sm:text-5xl font-medium mb-6">Writing</h1>
        <p className="text-ink/70 dark:text-nightpaper/70 max-w-xl">
          Two places I write: tech on Dev.to, life on Medium. New articles show up here on their own.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:items-center mt-8">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 dark:text-nightpaper/40" />
            <input
              type="search"
              placeholder="Search posts or tags…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent border border-ink/25 dark:border-nightpaper/25 rounded-[2px] pl-9 pr-4 py-2.5 text-sm outline-none focus:border-forest dark:focus:border-forest-light"
            />
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Writing sections">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={active === t.id}
                onClick={() => setActive(t.id)}
                className={`font-mono text-[11px] uppercase tracking-[0.1em] px-3 py-1.5 rounded-none border-2 font-bold transition-colors ${
                  active === t.id
                    ? 'bg-forest text-paper border-forest dark:bg-forest-light dark:text-night dark:border-forest-light'
                    : 'border-ink/40 text-ink/70 hover:border-ink dark:border-nightpaper/30 dark:text-nightpaper/70'
                }`}
              >
                {t.label} · {t.sub}
                {status === 'success' && ` (${counts[t.id]})`}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-6 text-sm text-ink/60 dark:text-nightpaper/60">{tab.blurb}</p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        {status === 'loading' && <p className="catalog-tab">Loading…</p>}
        {status === 'error' && (
          <div className="index-card p-6 max-w-md">
            <p className="text-sm text-ink/70 dark:text-nightpaper/70">
              Couldn&apos;t load articles right now. You can read them directly on{' '}
              <a href={tab.href} className="link-underline" target="_blank" rel="noopener noreferrer">{tab.sub}</a>.
            </p>
          </div>
        )}
        {status === 'success' && filtered.length === 0 && (
          <p className="text-ink/60 dark:text-nightpaper/60">
            {q ? 'Nothing matches that search.' : 'No articles here yet.'}
          </p>
        )}
        {filtered.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        )}
        <a href={tab.href} target="_blank" rel="noopener noreferrer" className="inline-block mt-10 font-mono text-[12px] uppercase tracking-[0.12em] link-underline">
          More on {tab.sub}
        </a>
      </section>
    </>
  )
}
