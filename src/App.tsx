import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'

// Route-based code splitting: only Home ships in the initial bundle, everything
// else loads on navigation. Keeps first-load JS small as the site grows.
const About = lazy(() => import('./pages/About'))
const Blog = lazy(() => import('./pages/Blog'))
const Projects = lazy(() => import('./pages/Projects'))
const Products = lazy(() => import('./pages/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Resources = lazy(() => import('./pages/Resources'))
const Newsletter = lazy(() => import('./pages/Newsletter'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function RouteFallback() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <p className="catalog-tab">Loading…</p>
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
