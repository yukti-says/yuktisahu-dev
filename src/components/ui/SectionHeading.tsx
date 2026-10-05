interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
}

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10 pt-4 border-t-[5px] border-double border-ink/80 dark:border-nightpaper/60">
      <p className="catalog-tab mb-3">{eyebrow}</p>
      <h2 className="text-3xl sm:text-5xl font-medium leading-[1.05] text-ink dark:text-nightpaper">{title}</h2>
      {description && (
        <p className="mt-3 max-w-xl text-ink/70 dark:text-nightpaper/70">{description}</p>
      )}
    </div>
  )
}
