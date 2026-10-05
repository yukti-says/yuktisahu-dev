import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, BookOpen, Code2 } from 'lucide-react'
import NewsletterInline from '../ui/NewsletterInline'

export default function Footer() {
  return (
    <footer className="border-t-[5px] border-double border-ink/80 dark:border-nightpaper/60 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-[1.1fr_0.8fr_0.8fr]">
        <div>
          <p className="catalog-tab mb-3">Field Notes</p>
          <p className="text-ink/70 dark:text-nightpaper/70 max-w-sm mb-5">
            One short email a month on what I&apos;m building, reading, and learning.
          </p>
          <NewsletterInline />
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink/50 dark:text-nightpaper/50 mb-3">
            Site
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="link-underline">About</Link></li>
            <li><Link to="/blog" className="link-underline">Writing</Link></li>
            <li><Link to="/projects" className="link-underline">Projects</Link></li>
            <li><Link to="/products" className="link-underline">Digital Products</Link></li>
            <li><Link to="/resources" className="link-underline">Free Resources</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink/50 dark:text-nightpaper/50 mb-3">
            Elsewhere
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/yukti-says" aria-label="GitHub" className="hover:text-forest dark:hover:text-forest-light"><Github size={18} /></a>
            <a href="https://www.linkedin.com/in/yukti-sahu2004/" aria-label="LinkedIn" className="hover:text-forest dark:hover:text-forest-light"><Linkedin size={18} /></a>
            <a href="https://medium.com/@Yuktisahu345" aria-label="Medium" className="hover:text-forest dark:hover:text-forest-light"><BookOpen size={18} /></a>
            <a href="https://dev.to/yuktisays" aria-label="Dev.to" className="hover:text-forest dark:hover:text-forest-light"><Code2 size={18} /></a>
            <Link to="/contact" aria-label="Email" className="hover:text-forest dark:hover:text-forest-light"><Mail size={18} /></Link>
          </div>
        </div>
      </div>

      <div className="rule">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between gap-2 font-mono text-[11px] uppercase tracking-wide text-ink/50 dark:text-nightpaper/50">
          <span>© {new Date().getFullYear()} Yukti Sahu</span>
          <span>Made with care</span>
        </div>
      </div>
    </footer>
  )
}
