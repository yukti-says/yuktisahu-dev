import { Link } from 'react-router-dom'
import Seo from '../components/ui/Seo'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <section className="max-w-xl mx-auto px-6 py-32 text-center">
      <Seo title="Page not found" />
      <p className="catalog-tab justify-center mb-4">File Missing</p>
      <h1 className="text-5xl font-medium mb-4">404</h1>
      <p className="text-ink/70 dark:text-nightpaper/70 mb-8">
        This page isn't in the catalog. It may have moved, or it never existed.
      </p>
      <Link to="/">
        <Button variant="primary">Back to the front desk</Button>
      </Link>
    </section>
  )
}
