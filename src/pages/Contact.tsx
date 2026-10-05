import { FormEvent, useState } from 'react'
import { Github, Linkedin, Mail, BookOpen, Code2 } from 'lucide-react'
import Seo from '../components/ui/Seo'
import Button from '../components/ui/Button'

const socials = [
  { label: 'GitHub', href: 'https://github.com/yukti-says', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yukti-sahu2004/', icon: Linkedin },
  { label: 'Medium', href: 'https://medium.com/@Yuktisahu345', icon: BookOpen },
  { label: 'Dev.to', href: 'https://dev.to/yuktisays', icon: Code2 },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [company, setCompany] = useState('') // honeypot — real users never see or fill this
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (company) return // bot filled the honeypot — silently drop
    // Placeholder: wire this up to Formspree, a serverless function, or your inbox of choice.
    setSent(true)
  }

  return (
    <section className="max-w-2xl mx-auto px-6 pt-16 pb-24">
      <Seo title="Contact" description="Get in touch with Yukti Sahu." />
      <p className="catalog-tab mb-4">File No. 070 — Contact</p>
      <h1 className="text-4xl sm:text-5xl font-medium mb-6">Say hello</h1>
      <p className="text-ink/70 dark:text-nightpaper/70 mb-10">
        For collaborations, questions about a resource, or just to say the guide helped —
        this reaches me directly.
      </p>

      {sent ? (
        <div className="index-card p-6">
          <p className="font-mono text-sm text-forest dark:text-forest-light">
            Message sent — I read every one and reply within a few days.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 mb-14">
          {/* Honeypot — hidden from real users via CSS + off-screen positioning, not display:none
              (some bots skip display:none fields but still fill visually-hidden ones). */}
          <input
            type="text"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute w-px h-px opacity-0 overflow-hidden -left-[9999px]"
          />
          <div>
            <label htmlFor="name" className="block font-mono text-[11px] uppercase tracking-wide text-ink/60 dark:text-nightpaper/60 mb-2">
              Name
            </label>
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-transparent border border-ink/25 dark:border-nightpaper/25 rounded-[2px] px-4 py-2.5 text-sm outline-none focus:border-forest dark:focus:border-forest-light"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-mono text-[11px] uppercase tracking-wide text-ink/60 dark:text-nightpaper/60 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-transparent border border-ink/25 dark:border-nightpaper/25 rounded-[2px] px-4 py-2.5 text-sm outline-none focus:border-forest dark:focus:border-forest-light"
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-mono text-[11px] uppercase tracking-wide text-ink/60 dark:text-nightpaper/60 mb-2">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-transparent border border-ink/25 dark:border-nightpaper/25 rounded-[2px] px-4 py-2.5 text-sm outline-none focus:border-forest dark:focus:border-forest-light resize-none"
            />
          </div>
          <Button type="submit" variant="primary">Send message</Button>
        </form>
      )}

      <div className="rule pt-8">
        <p className="catalog-tab mb-4">Elsewhere</p>
        <div className="flex flex-wrap gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-wide link-underline"
            >
              <s.icon size={14} /> {s.label}
            </a>
          ))}
          <a
            href="mailto:ps5036177@gmail.com"
            className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-wide link-underline"
          >
            <Mail size={14} /> Email
          </a>
        </div>
      </div>
    </section>
  )
}
