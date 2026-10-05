import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '../ui/ThemeToggle'
import Logo from '../ui/Logo'
import { cn } from '../../lib/utils'

const links = [
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Writing' },
  { to: '/projects', label: 'Projects' },
  { to: '/products', label: 'Digital Products' },
  { to: '/resources', label: 'Resources' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-30 bg-paper/90 dark:bg-night/90 backdrop-blur border-b-[5px] border-double border-ink/80 dark:border-nightpaper/60">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-ink dark:text-nightpaper">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  'font-mono text-[12px] font-bold uppercase tracking-[0.12em] transition-colors',
                  isActive
                    ? 'text-forest dark:text-forest-light'
                    : 'text-ink/70 hover:text-ink dark:text-nightpaper/70 dark:hover:text-nightpaper',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              cn(
                'font-mono text-[12px] font-bold uppercase tracking-[0.12em] transition-colors',
                isActive
                  ? 'text-forest dark:text-forest-light'
                  : 'text-ink/70 hover:text-ink dark:text-nightpaper/70 dark:hover:text-nightpaper',
              )
            }
          >
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            className="md:hidden grid place-items-center w-10 h-10"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-ink/10 dark:border-nightpaper/10 px-6 py-4 flex flex-col gap-4" aria-label="Mobile">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="font-mono text-sm uppercase tracking-[0.12em] text-ink/80 dark:text-nightpaper/80"
            >
              {l.label}
            </NavLink>
          ))}

          <NavLink
            to="/contact"
            onClick={() => setOpen(false)}
            className="font-mono text-sm uppercase tracking-[0.12em] text-ink/80 dark:text-nightpaper/80 pt-2"
          >
            Contact
          </NavLink>
        </nav>
      )}
    </header>
  )
}
