import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      className="grid place-items-center w-10 h-10 rounded-full border-2 border-ink text-ink hover:bg-ink hover:text-paper dark:border-nightpaper dark:text-nightpaper dark:hover:bg-nightpaper dark:hover:text-night transition-colors"
    >
      {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  )
}
