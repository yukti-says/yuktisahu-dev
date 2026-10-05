import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { TimelineEntry } from '../../data/timeline'
import { cn } from '../../lib/utils'

export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const [openYear, setOpenYear] = useState<number | null>(null)

  return (
    <ol className="relative">
      {entries.map((t, i) => {
        const isOpen = openYear === i
        const isLast = i === entries.length - 1
        return (
          <li key={`${t.year}-${i}`} className="relative flex gap-6">
            <div className="flex flex-col items-center shrink-0 w-14">
              <span className="font-mono text-sm text-forest dark:text-forest-light pt-0.5">{t.year}</span>
              {!isLast && <span className="w-px flex-1 bg-ink/15 dark:bg-nightpaper/15 mt-2" />}
            </div>

            <button
              onClick={() => setOpenYear(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex-1 text-left pb-8 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium group-hover:text-forest dark:group-hover:text-forest-light transition-colors">
                    {t.title}
                  </h3>
                  <p className="text-sm text-ink/70 dark:text-nightpaper/70 mt-1">{t.summary}</p>
                </div>
                <Plus
                  size={16}
                  className={cn(
                    'shrink-0 mt-1 text-ink/40 dark:text-nightpaper/40 transition-transform duration-200',
                    isOpen && 'rotate-45 text-forest dark:text-forest-light',
                  )}
                />
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="text-sm text-ink/60 dark:text-nightpaper/60 overflow-hidden mt-3"
                  >
                    {t.detail}
                  </motion.p>
                )}
              </AnimatePresence>
            </button>
          </li>
        )
      })}
    </ol>
  )
}
