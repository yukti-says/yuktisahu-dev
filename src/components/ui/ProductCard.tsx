import { Link } from 'react-router-dom'
import { Product } from '../../types'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/products/${product.slug}`} className="group block index-card index-card-interactive p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <p className="catalog-tab">{product.category}</p>
        <span className="font-mono text-[10px] uppercase tracking-wide text-ink/40 dark:text-nightpaper/40">
          v{product.version}
        </span>
      </div>
      <h3 className="text-xl font-medium group-hover:text-forest dark:group-hover:text-forest-light transition-colors">
        {product.title}
      </h3>
      <p className="mt-2 text-sm text-ink/70 dark:text-nightpaper/70 flex-1">{product.tagline}</p>
      <div className="mt-5 flex items-center justify-between">
        <span className="font-mono font-bold text-sm text-ochre-text dark:text-ochre-light border-2 border-dashed border-ochre-text/70 dark:border-ochre-light/70 px-2.5 py-0.5">{product.price}</span>
        <span className="font-mono text-[11px] uppercase tracking-wide text-ink/50 dark:text-nightpaper/50">
          {product.format}
        </span>
      </div>
    </Link>
  )
}
