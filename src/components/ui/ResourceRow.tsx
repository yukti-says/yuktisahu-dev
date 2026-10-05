import { Link } from 'react-router-dom'
import { Download } from 'lucide-react'
import { Resource } from '../../types'
import { products } from '../../data/products'

export default function ResourceRow({ resource }: { resource: Resource }) {
  const relatedProduct = products.find((p) => resource.relatedProductSlugs?.includes(p.slug))

  return (
    <div className="flex items-center justify-between gap-4 py-5 rule first:rule-none">
      <div>
        <p className="catalog-tab mb-1">{resource.type}</p>
        <h3 className="font-medium">{resource.title}</h3>
        <p className="text-sm text-ink/70 dark:text-nightpaper/70 mt-1 max-w-xl">{resource.description}</p>
        {relatedProduct && (
          <Link
            to={`/products/${relatedProduct.slug}`}
            className="inline-block mt-2 font-mono text-[11px] uppercase tracking-wide text-ochre-text dark:text-ochre-light link-underline"
          >
            Pairs with {relatedProduct.title}
          </Link>
        )}
      </div>
      <a
        href={resource.downloadUrl || '#'}
        download={resource.downloadUrl ? true : undefined}
        className="shrink-0 grid place-items-center w-10 h-10 rounded-full border-2 border-ink text-ink hover:border-forest hover:text-forest dark:border-nightpaper/25 dark:text-nightpaper dark:hover:border-forest-light dark:hover:text-forest-light transition-colors"
        aria-label={`Download ${resource.title}`}
      >
        <Download size={16} />
      </a>
    </div>
  )
}
