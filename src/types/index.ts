export interface ProductFaq {
  question: string
  answer: string
}

export interface Product {
  slug: string
  title: string
  tagline: string
  description: string
  price: string
  category: string
  format: string
  /** Razorpay Payment Page link (e.g. https://pages.razorpay.com/your-page). */
  razorpayUrl?: string
  featured?: boolean
  whatsIncluded: string[]
  version: string
  lastUpdated: string
  faqs: ProductFaq[]
  relatedResourceSlugs?: string[]
  /** Public Notion page URL shown as an "Open live preview" button (Notion can't be embedded
   *  in an iframe). Used only when `images` is empty. */
  previewUrl?: string
  /** Public Notion link where visitors can open and duplicate the template. Used for the
   *  "Get the template" button when there is no paid checkout link (razorpayUrl). */
  templateUrl?: string
  /** Screenshot paths, e.g. '/products/dsa-revision-lab/dashboard.png' — put files under
   *  public/products/<slug>/ and reference them here. Takes priority over previewUrl. */
  images?: string[]
}

export interface Resource {
  slug: string
  title: string
  description: string
  type: string
  downloadUrl?: string
  relatedProductSlugs?: string[]
}

export interface WritingItem {
  id: string
  source: 'devto' | 'medium'
  title: string
  excerpt: string
  url: string
  date: string
  readingTime: number
  tags: string[]
}

export interface Repo {
  id: number
  name: string
  description: string
  url: string
  homepage: string
  language: string
  topics: string[]
  stars: number
  pushedAt: string
}
