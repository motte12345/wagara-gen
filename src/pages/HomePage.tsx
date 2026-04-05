import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useT, useLang, langPath } from '../i18n/index.ts'
import { PageHead } from '../components/PageHead.tsx'
import { JsonLd } from '../components/JsonLd.tsx'
import { PATTERN_LIST } from '../patterns/index.ts'
import { getTileDimensions } from '../patterns/types.ts'
import type { PatternCategory } from '../patterns/types.ts'
import { SITE_URL } from '../constants.ts'

// Pre-compute default SVG for each pattern (stable across renders)
const DEFAULT_SVG_MAP = new Map(
  PATTERN_LIST.map((p) => [p.id, p.generate(p.defaultParams)]),
)

const CATEGORIES: ReadonlyArray<PatternCategory | 'all'> = ['all', 'geometric', 'nature', 'textile']

export function HomePage() {
  const t = useT()
  const lang = useLang()
  const [category, setCategory] = useState<PatternCategory | 'all'>('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim()
    return PATTERN_LIST.filter((pattern) => {
      if (category !== 'all' && pattern.category !== category) return false
      if (!query) return true
      const info = t.patterns[pattern.id]
      const name = (info?.name ?? pattern.id).toLowerCase()
      const desc = (info?.description ?? '').toLowerCase()
      return name.includes(query) || desc.includes(query) || pattern.id.includes(query)
    })
  }, [category, search, t])

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

      <section className="gallery-controls">
        <div className="gallery-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-btn${category === cat ? ' filter-btn--active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {t.gallery[cat]}
            </button>
          ))}
        </div>
        <input
          type="search"
          className="gallery-search"
          placeholder={t.gallery.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <section className="pattern-gallery">
        {filtered.length === 0 && (
          <p className="gallery-empty">{t.gallery.noResults}</p>
        )}
        {filtered.map((pattern) => {
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
