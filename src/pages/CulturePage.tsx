import { useParams, Navigate, Link } from 'react-router-dom'
import { useT, useLang, langPath } from '../i18n/index.ts'
import { PageHead } from '../components/PageHead.tsx'
import { JsonLd } from '../components/JsonLd.tsx'
import { getPattern } from '../patterns/index.ts'
import { getTileDimensions } from '../patterns/types.ts'
import { SITE_URL } from '../constants.ts'

const AMAZON_TAG_EN = 'qp2026-20'
const AMAZON_TAG_JA = 'qp2026-22'

// Pre-compute SVG for pattern preview header
const svgCache = new Map<string, string>()
function getPatternSvg(patternId: string): string {
  if (svgCache.has(patternId)) return svgCache.get(patternId)!
  const pattern = getPattern(patternId)
  if (!pattern) return ''
  const svg = pattern.generate(pattern.defaultParams)
  svgCache.set(patternId, svg)
  return svg
}

export function CulturePage() {
  const { pattern: patternId } = useParams<{ pattern: string }>()
  const t = useT()
  const lang = useLang()

  const pattern = patternId ? getPattern(patternId) : undefined

  if (!pattern) {
    return <Navigate to={`/${lang}/`} replace />
  }

  const info = t.patterns[pattern.id]
  if (!info) {
    return <Navigate to={`/${lang}/`} replace />
  }

  const labels = t.culture
  const { width: tw, height: th } = getTileDimensions(pattern, pattern.defaultParams.scale)

  const amazonDomain = lang === 'ja' ? 'www.amazon.co.jp' : 'www.amazon.com'
  const amazonTag = lang === 'ja' ? AMAZON_TAG_JA : AMAZON_TAG_EN
  const searchQuery = lang === 'ja' ? info.name : pattern.id
  const amazonUrl = `https://${amazonDomain}/s?k=${encodeURIComponent(searchQuery)}&tag=${amazonTag}`

  const sections = [
    { label: labels.origin, content: info.origin },
    { label: labels.history, content: info.history },
    { label: labels.symbolism, content: info.symbolism },
    { label: labels.modernUse, content: info.modernUse },
  ]

  return (
    <div className="culture-page">
      <PageHead
        title={`${info.name} — ${labels.history} | ${t.common.siteTitle}`}
        description={`${info.origin} ${info.symbolism}`}
        path={`/${pattern.id}/culture`}
      />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        name: `${info.name} — ${labels.history}`,
        description: info.description,
        url: `${SITE_URL}/${lang}/${pattern.id}/culture`,
        image: `${SITE_URL}/ogp.png`,
      }} />

      <div className="culture-hero">
        <svg
          className="culture-hero__pattern"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={info.name}
        >
          <defs>
            <pattern
              id={`culture-${pattern.id}`}
              width={tw}
              height={th}
              patternUnits="userSpaceOnUse"
            >
              <g dangerouslySetInnerHTML={{ __html: getPatternSvg(pattern.id) }} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={pattern.defaultParams.color2} />
          <rect width="100%" height="100%" fill={`url(#culture-${pattern.id})`} />
        </svg>
        <h1>{info.name}</h1>
        <p>{info.description}</p>
      </div>

      <nav className="culture-nav">
        <Link to={langPath(lang, `/${pattern.id}`)}>{labels.backToEditor}</Link>
      </nav>

      <div className="culture-content">
        {sections.map((s) => (
          <section key={s.label} className="culture-block">
            <h2>{s.label}</h2>
            <p>{s.content}</p>
          </section>
        ))}
      </div>

      <section className="culture-shop">
        <h2>{labels.shopTitle}</h2>
        <a
          href={amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary"
        >
          {labels.shopAmazon}
        </a>
      </section>

      <nav className="culture-nav culture-nav--bottom">
        <Link to={langPath(lang, `/${pattern.id}`)} className="btn btn--primary">
          {labels.editPattern}
        </Link>
      </nav>
    </div>
  )
}
