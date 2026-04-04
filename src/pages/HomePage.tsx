import { Link } from 'react-router-dom'
import { useT, useLang, langPath } from '../i18n/index.ts'
import { PageHead } from '../components/PageHead.tsx'
import { JsonLd } from '../components/JsonLd.tsx'
import { PATTERN_LIST } from '../patterns/index.ts'
import { getTileDimensions } from '../patterns/types.ts'
import { SITE_URL } from '../constants.ts'

// Pre-compute default SVG for each pattern (stable across renders)
const DEFAULT_SVG_MAP = new Map(
  PATTERN_LIST.map((p) => [p.id, p.generate(p.defaultParams)]),
)

export function HomePage() {
  const t = useT()
  const lang = useLang()

  return (
    <div className="home-page">
      <PageHead
        title={t.common.siteTitle}
        description={t.common.siteDescription}
        path="/"
      />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: t.common.siteTitle,
        description: t.common.siteDescription,
        url: `${SITE_URL}/${lang}/`,
        applicationCategory: 'DesignApplication',
        operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0' },
      }} />

      <section className="hero">
        <h1>{t.home.heading}</h1>
        <p>{t.home.subheading}</p>
      </section>

      <section className="pattern-gallery">
        {PATTERN_LIST.map((pattern) => {
          const info = t.patterns[pattern.id]
          const { width: tw, height: th } = getTileDimensions(pattern, pattern.defaultParams.scale)
          return (
            <Link
              key={pattern.id}
              to={langPath(lang, `/${pattern.id}`)}
              className="pattern-card"
            >
              <div className="pattern-card__preview">
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label={info?.name ?? pattern.id}
                >
                  <defs>
                    <pattern
                      id={`preview-${pattern.id}`}
                      width={tw}
                      height={th}
                      patternUnits="userSpaceOnUse"
                    >
                      <g
                        dangerouslySetInnerHTML={{
                          __html: DEFAULT_SVG_MAP.get(pattern.id) ?? '',
                        }}
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={pattern.defaultParams.color2} />
                  <rect width="100%" height="100%" fill={`url(#preview-${pattern.id})`} />
                </svg>
              </div>
              <h2 className="pattern-card__name">{info?.name ?? pattern.id}</h2>
              <p className="pattern-card__desc">{info?.description ?? ''}</p>
            </Link>
          )
        })}
      </section>
    </div>
  )
}
