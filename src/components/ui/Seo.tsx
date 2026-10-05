import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface SeoProps {
  title: string
  description?: string
}

const SITE_URL = 'https://yuktisahu.dev'

function setMeta(selector: string, attr: string, content: string) {
  let tag = document.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    const [, name] = selector.match(/\[(.+?)\]/) ?? []
    if (name) {
      const [key, value] = name.split('=')
      tag.setAttribute(key, value.replace(/"/g, ''))
    }
    document.head.appendChild(tag)
  }
  tag.setAttribute(attr, content)
}

export default function Seo({ title, description }: SeoProps) {
  const { pathname } = useLocation()

  useEffect(() => {
    const fullTitle = title.includes('Yukti Sahu') ? title : `${title} — Yukti Sahu`
    const canonicalUrl = `${SITE_URL}${pathname === '/' ? '' : pathname}`

    document.title = fullTitle

    if (description) {
      setMeta('meta[name="description"]', 'content', description)
    }

    // Canonical + Open Graph/Twitter tags need to track the current route too —
    // otherwise every shared link (even /blog/some-post) shows the homepage's
    // title, description, and canonical URL to crawlers and social previews.
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl)

    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:url"]', 'content', canonicalUrl)
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)
    if (description) {
      setMeta('meta[property="og:description"]', 'content', description)
      setMeta('meta[name="twitter:description"]', 'content', description)
    }
  }, [title, description, pathname])

  return null
}
