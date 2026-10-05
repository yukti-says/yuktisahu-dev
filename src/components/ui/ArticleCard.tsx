import { ArrowUpRight } from 'lucide-react'
import { WritingItem } from '../../types'
import { formatDate } from '../../lib/utils'

const sourceLabel: Record<WritingItem['source'], string> = {
  devto: 'Dev.to',
  medium: 'Medium',
}

// Articles live on Dev.to / Medium, so the card links straight out to the original.
export default function ArticleCard({ post }: { post: WritingItem }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block index-card index-card-interactive p-6 h-full"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="catalog-tab">{sourceLabel[post.source]}</p>
        <ArrowUpRight size={15} className="text-ink/40 dark:text-nightpaper/40 group-hover:text-forest dark:group-hover:text-forest-light transition-colors" />
      </div>
      <h3 className="text-xl font-medium leading-snug group-hover:text-forest dark:group-hover:text-forest-light transition-colors">
        {post.title}
      </h3>
      {post.excerpt && (
        <p className="mt-3 text-sm text-ink/70 dark:text-nightpaper/70 line-clamp-3">{post.excerpt}</p>
      )}
      <div className="mt-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-wide text-ink/50 dark:text-nightpaper/50">
        <span>{formatDate(post.date)}</span>
        <span aria-hidden="true">·</span>
        <span>{post.readingTime} min read</span>
      </div>
    </a>
  )
}
