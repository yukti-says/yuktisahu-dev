import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-none border-2 border-ink dark:border-nightpaper px-5 py-2.5 font-mono font-bold text-[12px] uppercase tracking-[0.14em] shadow-[3px_3px_0_0_#1F2420] dark:shadow-[3px_3px_0_0_rgba(237,235,221,0.3)] transition-[transform,box-shadow,background-color] duration-150 hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4px_4px_0_0_#1F2420] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed',
          variant === 'primary' &&
            'bg-forest text-paper hover:bg-forest-deep dark:bg-forest-light dark:text-night dark:hover:bg-forest',
          variant === 'secondary' &&
            'bg-paper text-ink hover:bg-paper-dim dark:bg-night-card dark:text-nightpaper',
          variant === 'ghost' &&
            'border-transparent shadow-none text-forest hover:text-forest-deep dark:text-forest-light dark:hover:text-paper underline decoration-forest/40 underline-offset-4',
          className,
        )}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'
export default Button
