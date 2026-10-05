import Seo from '../components/ui/Seo'
import RepoCard from '../components/ui/RepoCard'
import { useApiData } from '../hooks/useApiData'
import { fetchReposDirect } from '../lib/feeds'
import { Repo } from '../types'

export default function Projects() {
  const { data: repos, status } = useApiData<Repo>('/api/github', fetchReposDirect)

  return (
    <>
      <Seo title="Projects" description="Open-source projects by Yukti Sahu, pulled live from GitHub." />
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <p className="catalog-tab mb-4">File No. 030 — Projects</p>
        <h1 className="text-4xl sm:text-5xl font-medium mb-4">The gallery</h1>
        <p className="text-ink/70 dark:text-nightpaper/70 max-w-xl">
          Everything I build lives on GitHub, and this page updates as I push new work.
        </p>
      </section>
      <section className="max-w-6xl mx-auto px-6 pb-24">
        {status === 'loading' && <p className="catalog-tab">Loading…</p>}
        {status === 'error' && (
          <div className="index-card p-6 max-w-md">
            <p className="text-sm text-ink/70 dark:text-nightpaper/70">
              Couldn&apos;t load projects right now. Find them on{' '}
              <a href="https://github.com/yukti-says" className="link-underline" target="_blank" rel="noopener noreferrer">GitHub</a>.
            </p>
          </div>
        )}
        {status === 'success' && repos.length === 0 && (
          <div className="index-card p-8 text-center max-w-md mx-auto">
            <p className="catalog-tab justify-center mb-3">Nothing here yet</p>
            <p className="text-ink/70 dark:text-nightpaper/70">Public repositories will appear here automatically.</p>
          </div>
        )}
        {repos.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((r) => (
              <RepoCard key={r.id} repo={r} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
