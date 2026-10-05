import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, ExternalLink } from 'lucide-react'
import Seo from '../components/ui/Seo'
import Button from '../components/ui/Button'
import { products } from '../data/products'
import { resources } from '../data/resources'
import { formatDate } from '../lib/utils'
import NotFound from './NotFound'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = products.find((p) => p.slug === slug)

  if (!product) return <NotFound />

  const relatedResources = resources.filter((r) => product.relatedResourceSlugs?.includes(r.slug))

  return (
    <>
      <Seo title={product.title} description={product.tagline} />
      <article className="max-w-2xl mx-auto px-6 pt-16 pb-24">
        <Link to="/products" className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-wide text-ink/60 dark:text-nightpaper/60 hover:text-ink dark:hover:text-nightpaper mb-8">
          <ArrowLeft size={14} /> All products
        </Link>

        <p className="catalog-tab mb-4">{product.category}</p>
        <h1 className="text-3xl sm:text-4xl font-medium leading-tight mb-3">{product.title}</h1>
        <p className="text-lg text-ink/70 dark:text-nightpaper/70 mb-10">{product.tagline}</p>
      </article>

      {/* Preview — wider than the article column so screenshots/the embedded Notion
          page have room to breathe. Priority: product.images (screenshots) first,
          then product.previewUrl (a public "Share to web" Notion link) as a live
          embedded fallback, then a placeholder if neither is set yet. */}
      <section className="max-w-4xl mx-auto px-6 mb-10">
        <p className="catalog-tab mb-3">Preview</p>
        {product.images && product.images.length > 0 ? (
          <div className={`grid gap-4 ${product.images.length > 1 ? 'sm:grid-cols-2' : ''}`}>
            {product.images.map((src) => (
              <div key={src} className="index-card overflow-hidden">
                <img src={src} alt={`${product.title} screenshot`} className="w-full h-auto" loading="lazy" />
              </div>
            ))}
          </div>
        ) : product.previewUrl ? (
          // Notion blocks being embedded in other sites (iframes show "refused to connect"),
          // so link out to the live page instead. Add screenshots to `images` for an in-page preview.
          <div className="index-card p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="catalog-tab mb-3">Live template</p>
              <p className="text-lg text-ink/85 dark:text-nightpaper/85 max-w-md">
                Explore the real template in Notion, with every page and database. It&apos;s always the latest version.
              </p>
            </div>
            <a href={product.previewUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
              <Button variant="primary">
                Open live preview <ExternalLink size={14} />
              </Button>
            </a>
          </div>
        ) : (
          <div className="index-card p-8 text-center">
            <p className="text-sm text-ink/60 dark:text-nightpaper/60">
              Preview coming soon — a look at the real template.
            </p>
          </div>
        )}
      </section>

      <article className="max-w-2xl mx-auto px-6 pb-24">
        <div className="index-card p-6 mb-6">
          <p className="text-ink/85 dark:text-nightpaper/85 leading-relaxed mb-6">{product.description}</p>

          <p className="font-mono text-[11px] uppercase tracking-wide text-ink/50 dark:text-nightpaper/50 mb-3">
            What&apos;s included
          </p>
          <ul className="space-y-2 mb-6">
            {product.whatsIncluded.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink/80 dark:text-nightpaper/80">
                <Check size={15} className="text-forest dark:text-forest-light shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rule pt-5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wide text-ink/45 dark:text-nightpaper/45 mb-1">Format</p>
              <p className="text-sm">{product.format}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wide text-ink/45 dark:text-nightpaper/45 mb-1">Version</p>
              <p className="text-sm">{product.version}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wide text-ink/45 dark:text-nightpaper/45 mb-1">Updated</p>
              <p className="text-sm">{formatDate(product.lastUpdated)}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wide text-ink/45 dark:text-nightpaper/45 mb-1">Price</p>
              <p className="text-sm font-mono text-ochre-text dark:text-ochre-light">{product.price}</p>
            </div>
          </div>
        </div>

        {/* Razorpay checkout — set razorpayUrl in src/data/products.ts to enable.
            A plain link out to your hosted Razorpay Payment Page (opens in a new tab). */}
        {product.razorpayUrl ? (
          <a href={product.razorpayUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="primary">Buy now</Button>
          </a>
        ) : product.templateUrl ? (
          <div>
            <a href={product.templateUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary">Get the template</Button>
            </a>
            <p className="mt-3 text-sm text-ink/60 dark:text-nightpaper/60">
              Opens in Notion. Click <span className="font-bold">Duplicate</span> in the top-right corner to add it to your own workspace.
            </p>
          </div>
        ) : (
          <Button variant="secondary" disabled>
            Coming soon
          </Button>
        )}

        {product.faqs.length > 0 && (
          <div className="mt-12 rule pt-6">
            <p className="catalog-tab mb-4">FAQs</p>
            <div className="space-y-5">
              {product.faqs.map((f) => (
                <div key={f.question}>
                  <p className="font-medium text-sm mb-1">{f.question}</p>
                  <p className="text-sm text-ink/70 dark:text-nightpaper/70">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 rule pt-6">
          <p className="catalog-tab mb-3">Reviews</p>
          <p className="text-sm text-ink/50 dark:text-nightpaper/50">
            No reviews yet — be the first to try it.
          </p>
        </div>

        <div className="mt-12 rule pt-6">
          <p className="catalog-tab mb-3">Support</p>
          <p className="text-sm text-ink/70 dark:text-nightpaper/70">
            Questions about this product?{' '}
            <Link to="/contact" className="link-underline">
              Get in touch
            </Link>
            {' '}and I'll help directly.
          </p>
        </div>

        {relatedResources.length > 0 && (
          <div className="mt-12 rule pt-6">
            <p className="catalog-tab mb-4">Related resources</p>
            <ul className="space-y-2">
              {relatedResources.map((r) => (
                <li key={r.slug}>
                  <Link to="/resources" className="link-underline text-sm">
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </>
  )
}
