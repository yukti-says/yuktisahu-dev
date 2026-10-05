import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import Seo from '../components/ui/Seo'
import SectionHeading from '../components/ui/SectionHeading'
import ArticleCard from '../components/ui/ArticleCard'
import RepoCard from '../components/ui/RepoCard'
import ProductCard from '../components/ui/ProductCard'
import ResourceRow from '../components/ui/ResourceRow'
import NewsletterInline from '../components/ui/NewsletterInline'
import Button from '../components/ui/Button'
import { useApiData } from '../hooks/useApiData'
import { fetchReposDirect, fetchWritingDirect } from '../lib/feeds'
import { Repo, WritingItem } from '../types'
import { products } from '../data/products'
import { resources } from '../data/resources'
import { timeline } from '../data/timeline'

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

const heroItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

export default function Home() {
  const { data: posts } = useApiData<WritingItem>('/api/writing', fetchWritingDirect)
  const { data: repos } = useApiData<Repo>('/api/github', fetchReposDirect)
  const featuredPosts = posts.slice(0, 3)
  const featuredProjects = repos.slice(0, 2)
  const featuredProducts = products.filter((p) => p.featured).slice(0, 3)
  const recentTimeline = [...timeline].slice(-3).reverse()
  const featuredResources = resources.slice(0, 3)

  return (
    <>
      <Seo
        title="Yukti Sahu — Software Developer, Writer & Builder"
        description="Projects, writing, and free study resources from Yukti Sahu, an MCA student and software developer."
      />

      {/* HERO — an index card, the site's signature element */}
      <section className="max-w-6xl mx-auto px-6 pt-14 sm:pt-20 pb-16">
        <motion.div
          initial="hidden"
          animate="show"
          variants={heroContainer}
          className="index-card p-8 sm:p-12 md:p-16 sm:-rotate-[0.35deg]"
        >
          <svg
            viewBox="0 0 120 120"
            aria-hidden="true"
            className="hidden md:block absolute right-10 top-28 w-32 h-32 rotate-[14deg] text-brick dark:text-brick-light opacity-80"
          >
            <defs>
              <path id="stampCircle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
            </defs>
            <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="3" />
            <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <text fontFamily="'Courier Prime', monospace" fontWeight="700" fontSize="10.5" fill="currentColor">
              <textPath href="#stampCircle" textLength="268" lengthAdjust="spacing">YUKTI SAHU ★ CODE &amp; WORDS ★ </textPath>
            </text>
            <text x="60" y="68" textAnchor="middle" fontFamily="'Fraunces', serif" fontStyle="italic" fontWeight="700" fontSize="26" fill="currentColor">YS</text>
          </svg>

          <motion.div variants={heroItem} className="flex items-center justify-between mb-8">
            <p className="catalog-tab">File No. 001 — Yukti Sahu</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink/40 dark:text-nightpaper/40">
              Bhopal, India
            </p>
          </motion.div>

          <motion.h1 variants={heroItem} className="text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.02] max-w-3xl">
            Building thoughtful
            <br />
            software. Writing about
            <br />
            <em className="text-forest dark:text-forest-light">code and life.</em>
          </motion.h1>

          <motion.p variants={heroItem} className="mt-6 max-w-xl text-lg text-ink/70 dark:text-nightpaper/70">
            I'm Yukti, an MCA student and software developer from India. This is where my
            projects, my writing, and the study resources I make all come together.
          </motion.p>

          <motion.div variants={heroItem} className="mt-9 flex flex-wrap items-center gap-4">
            <Link to="/projects">
              <Button variant="primary">
                See the work <ArrowUpRight size={15} />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="secondary">Read my story</Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* TIMELINE PREVIEW */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <SectionHeading eyebrow="File No. 002 — Timeline" title="How I got here" />
          <Link to="/about" className="hidden sm:flex items-center gap-1 font-mono text-[12px] uppercase tracking-[0.12em] link-underline">
            Full timeline <ArrowRight size={13} />
          </Link>
        </div>
        <ol className="grid sm:grid-cols-3 gap-6">
          {recentTimeline.map((t) => (
            <li key={t.year} className="rule pt-5">
              <span className="font-mono text-sm text-forest dark:text-forest-light">{t.year}</span>
              <h3 className="font-medium mt-2 mb-1">{t.title}</h3>
              <p className="text-sm text-ink/70 dark:text-nightpaper/70">{t.summary}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* RECENT WRITING */}
      {featuredPosts.length > 0 && (
      <section className="bg-paper-dim/40 dark:bg-night-card/30 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <SectionHeading eyebrow="File No. 003 — Writing" title="Recent writing" />
            <Link to="/blog" className="hidden sm:block font-mono text-[12px] uppercase tracking-[0.12em] link-underline">
              All writing
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
      )}

      {/* SELECTED PROJECTS */}
      {featuredProjects.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-end justify-between mb-10">
            <SectionHeading eyebrow="File No. 004 — Projects" title="Selected work" />
            <Link to="/projects" className="hidden sm:block font-mono text-[12px] uppercase tracking-[0.12em] link-underline">
              All projects
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {featuredProjects.map((project) => (
              <RepoCard key={project.id} repo={project} />
            ))}
          </div>
        </section>
      )}

      {/* FEATURED PRODUCTS */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <SectionHeading
            eyebrow="File No. 006 — Digital Products"
            title="Guides and templates"
            description="Notion systems I build myself, for DSA revision and for running a freelance business."
          />
          <Link to="/products" className="hidden sm:block font-mono text-[12px] uppercase tracking-[0.12em] link-underline">
            Visit the shop
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* FEATURED FREE RESOURCES */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-6">
          <SectionHeading eyebrow="File No. 007 — Free Resources" title="Take what's useful" />
          <Link to="/resources" className="hidden sm:block font-mono text-[12px] uppercase tracking-[0.12em] link-underline">
            All resources
          </Link>
        </div>
        <div className="rule" />
        {featuredResources.map((r) => (
          <ResourceRow key={r.slug} resource={r} />
        ))}
      </section>

      {/* NEWSLETTER CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="index-card p-8 sm:p-12 grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <p className="catalog-tab mb-3">File No. 008 — Newsletter</p>
            <h2 className="text-2xl sm:text-3xl font-medium mb-2">Get the next field note</h2>
            <p className="text-ink/70 dark:text-nightpaper/70 max-w-md">
              One short, honest email a month. No growth-hacking, no filler.
            </p>
          </div>
          <div className="w-full md:w-80">
            <NewsletterInline />
          </div>
        </div>
      </section>
    </>
  )
}
