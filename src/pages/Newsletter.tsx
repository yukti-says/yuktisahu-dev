import Seo from '../components/ui/Seo'
import NewsletterInline from '../components/ui/NewsletterInline'

const benefits = [
  'One short, honest email a month — never a growth-hack drip campaign.',
  'First look at new free resources and digital products.',
  'The occasional field note that never makes it to the blog.',
]

export default function Newsletter() {
  return (
    <section className="max-w-2xl mx-auto px-6 pt-16 pb-24">
      <Seo title="Newsletter" description="Subscribe to Yukti Sahu's monthly newsletter." />
      <p className="catalog-tab mb-4">File No. 060 — Newsletter</p>
      <h1 className="text-4xl sm:text-5xl font-medium mb-6">Field Notes, monthly</h1>
      <p className="text-lg text-ink/70 dark:text-nightpaper/70 mb-8">
        A short email once a month — what I built, what broke, and what I'd tell the version of me
        who started this a year ago.
      </p>

      <div className="index-card p-6 mb-10">
        <NewsletterInline />
      </div>

      <ul className="space-y-3 mb-12">
        {benefits.map((b) => (
          <li key={b} className="flex gap-3 text-ink/80 dark:text-nightpaper/80">
            <span className="text-forest dark:text-forest-light mt-1" aria-hidden="true">—</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="rule pt-6">
        <p className="catalog-tab mb-3">Archive</p>
        <p className="text-sm text-ink/50 dark:text-nightpaper/50">
          The first issue hasn't gone out yet — past issues will be archived here.
        </p>
      </div>
    </section>
  )
}
