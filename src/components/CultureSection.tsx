import { useT } from '../i18n/index.ts'

interface CultureSectionProps {
  readonly patternId: string
}

export function CultureSection({ patternId }: CultureSectionProps) {
  const t = useT()
  const info = t.patterns[patternId]
  const labels = t.culture

  if (!info) return null

  const sections = [
    { label: labels.origin, content: info.origin },
    { label: labels.history, content: info.history },
    { label: labels.symbolism, content: info.symbolism },
    { label: labels.modernUse, content: info.modernUse },
  ]

  return (
    <section className="culture-section">
      {sections.map((s) => (
        <div key={s.label} className="culture-block">
          <h3>{s.label}</h3>
          <p>{s.content}</p>
        </div>
      ))}
    </section>
  )
}
