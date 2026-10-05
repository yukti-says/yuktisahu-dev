import { useScrollProgress } from '../../hooks/useScrollProgress'

export default function ScrollProgress() {
  const progress = useScrollProgress()
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-transparent" aria-hidden="true">
      <div
        className="h-full bg-ochre origin-left transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
