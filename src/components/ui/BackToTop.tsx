import { ArrowUp } from 'lucide-react'
import { useBackToTop } from '../../hooks/useBackToTop'

export default function BackToTop() {
  const visible = useBackToTop()
  if (!visible) return null
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 grid place-items-center w-11 h-11 rounded-none bg-ink text-paper dark:bg-nightpaper dark:text-night shadow-card hover:opacity-90 transition-opacity"
    >
      <ArrowUp size={18} />
    </button>
  )
}
