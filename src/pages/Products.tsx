import { useMemo, useState } from 'react'
import Seo from '../components/ui/Seo'
import ProductCard from '../components/ui/ProductCard'
import { products } from '../data/products'

export default function Products() {
  const [category, setCategory] = useState('All')
  const categories = useMemo(() => ['All', ...Array.from(new Set(products.map((p) => p.category)))], [])
  const filtered = category === 'All' ? products : products.filter((p) => p.category === category)

  return (
    <>
      <Seo title="Digital Products" description="Notion templates Yukti Sahu builds and sells — for DSA revision and for running a freelance business." />
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <p className="catalog-tab mb-4">File No. 040 — Digital Products</p>
        <h1 className="text-4xl sm:text-5xl font-medium mb-6">Digital Products</h1>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`font-mono text-[11px] uppercase tracking-[0.1em] px-3 py-1.5 rounded-none border-2 font-bold transition-colors ${
                category === c
                  ? 'bg-forest text-paper border-forest dark:bg-forest-light dark:text-night dark:border-forest-light'
                  : 'border-ink/40 text-ink/70 hover:border-ink dark:border-nightpaper/30 dark:text-nightpaper/70'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}
