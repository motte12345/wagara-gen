import { Link } from 'react-router-dom'
import { useT, useLang, langPath } from '../i18n/index.ts'

interface CultureSectionProps {
  readonly patternId: string
}

export function CultureSection({ patternId }: CultureSectionProps) {
  const t = useT()
  const lang = useLang()
  const info = t.patterns[patternId]

  if (!info) return null

  return (
    <section className="culture-section">
      <div className="culture-block">
        <h3>{t.culture.origin}</h3>
        <p>{info.origin}</p>
      </div>
      <Link
        to={langPath(lang, `/${patternId}/culture`)}
        className="culture-read-more"
      >
        {t.culture.readMore}
      </Link>
    </section>
  )
}
