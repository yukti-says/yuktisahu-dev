import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import NewsletterInline from './NewsletterInline'

const DISMISS_KEY = 'newsletter-popup-dismissed'

export default function NewsletterPopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY)) return
    let triggered = false
    const onScroll = () => {
      const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      if (scrolled > 0.6 && !triggered) {
        triggered = true
        setOpen(true)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const dismiss = () => {
    setOpen(false)
    sessionStorage.setItem(DISMISS_KEY, '1')
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          role="dialog"
          aria-label="Newsletter signup"
          className="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-96 z-40 index-card p-5"
        >
          <button
            onClick={dismiss}
            aria-label="Dismiss"
            className="absolute top-3 right-3 text-ink/40 hover:text-ink dark:text-nightpaper/40 dark:hover:text-nightpaper"
          >
            <X size={16} />
          </button>
          <p className="catalog-tab mb-2">Field Notes</p>
          <p className="text-sm text-ink/80 dark:text-nightpaper/80 mb-4">
            One short email a month — new projects, resources, and what I&apos;m learning. No spam.
          </p>
          <NewsletterInline compact />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
