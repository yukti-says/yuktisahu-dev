import Seo from '../components/ui/Seo'
import ResourceRow from '../components/ui/ResourceRow'
import { resources } from '../data/resources'

export default function Resources() {
  return (
    <>
      <Seo title="Free Resources" description="Free PDF notes on SQL, Python, OOPs, and DSA by Yukti Sahu." />
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-6">
        <p className="catalog-tab mb-4">File No. 050 — Free Resources</p>
        <h1 className="text-4xl sm:text-5xl font-medium mb-6">Take what's useful</h1>
        <p className="text-ink/70 dark:text-nightpaper/70">
          Notes I put together while learning this myself, free and with no email required.
        </p>
      </section>
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div className="rule" />
        {resources.map((r) => (
          <ResourceRow key={r.slug} resource={r} />
        ))}
      </section>
    </>
  )
}
