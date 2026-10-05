import { ArrowUpRight, Star } from 'lucide-react'
import { Repo } from '../../types'
import Tag from './Tag'

const pretty = (name: string) => name.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

// Projects come live from GitHub, so the card links straight to the repository.
export default function RepoCard({ repo }: { repo: Repo }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block index-card index-card-interactive p-6 h-full"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="catalog-tab">{repo.language || 'Project'}</p>
        <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-wide text-ink/50 dark:text-nightpaper/50">
          {repo.stars > 0 && (
            <span className="inline-flex items-center gap-1">
              <Star size={12} /> {repo.stars}
            </span>
          )}
          <ArrowUpRight size={15} className="group-hover:text-forest dark:group-hover:text-forest-light transition-colors" />
        </span>
      </div>
      <h3 className="text-xl font-medium group-hover:text-forest dark:group-hover:text-forest-light transition-colors">
        {pretty(repo.name)}
      </h3>
      <p className="mt-3 text-sm text-ink/70 dark:text-nightpaper/70 line-clamp-3">
        {repo.description || 'Source code on GitHub.'}
      </p>
      {repo.topics.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {repo.topics.slice(0, 4).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      )}
    </a>
  )
}
