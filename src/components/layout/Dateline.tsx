export default function Dateline() {
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return (
    <div className="hidden sm:block bg-ink text-paper dark:bg-nightpaper dark:text-night">
      <div className="max-w-6xl mx-auto px-6 h-8 flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
        <span>The Yukti Sahu Catalogue</span>
        <span>{today}</span>
        <span>Bhopal, India</span>
      </div>
    </div>
  )
}
