interface LogoProps {
  className?: string
  withWordmark?: boolean
}

/**
 * The Yukti Sahu mark: a "YS" monogram inside a bordered index-card seal,
 * echoing the site's card-catalog motif. Letterforms use currentColor so
 * they recolor automatically in dark mode; the seal ring and accent dot
 * stay on-brand forest/ochre in both themes.
 */
export default function Logo({ className, withWordmark = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ''}`}>
      <svg width="32" height="32" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="32" cy="32" r="24.5" fill="none" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1" />
        <text
          x="32"
          y="43"
          textAnchor="middle"
          fontFamily="'Fraunces', serif"
          fontStyle="italic"
          fontWeight="700"
          fontSize="24"
          fill="currentColor"
        >
          YS
        </text>
        <circle cx="50" cy="16" r="3.5" fill="#B8862E" />
      </svg>
      {withWordmark && (
        <span className="font-display italic font-bold text-xl tracking-tight">Yukti Sahu</span>
      )}
    </span>
  )
}
