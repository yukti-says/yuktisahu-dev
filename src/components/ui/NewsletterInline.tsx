import { FormEvent, useState } from 'react'
import Button from './Button'

export default function NewsletterInline({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('') // honeypot — real users never see or fill this
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    if (company) return // bot filled the honeypot — silently drop
    // Placeholder: wire this up to your email provider (Beehiiv, ConvertKit, Mailchimp, etc.)
    setStatus('submitted')
  }

  if (status === 'submitted') {
    return (
      <p className="font-mono text-sm text-forest dark:text-forest-light">
        You&apos;re on the list — first issue lands soon.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? 'flex gap-2' : 'flex flex-col sm:flex-row gap-3'}>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
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
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 bg-transparent border border-ink/25 dark:border-nightpaper/25 rounded-[2px] px-4 py-2.5 text-sm placeholder:text-ink/40 dark:placeholder:text-nightpaper/40 focus:border-forest dark:focus:border-forest-light outline-none"
      />
      <Button type="submit" variant="primary">
        Subscribe
      </Button>
    </form>
  )
}
