import { cn } from '../../lib/utils'

export default function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-block font-mono font-bold text-[10px] uppercase tracking-[0.14em] px-2 py-0.5 border border-ink/60 bg-paper-dim/70 text-ink/80 dark:border-nightpaper/40 dark:bg-night dark:text-nightpaper/80 rounded-none',
        className,
      )}
    >
      {children}
    </span>
  )
}
