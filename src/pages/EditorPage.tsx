import { useParams, Navigate } from 'react-router-dom'
import { useCallback } from 'react'
import { useT, useLang } from '../i18n/index.ts'
import { PageHead } from '../components/PageHead.tsx'
import { PatternPreview } from '../components/PatternPreview.tsx'
import { EditorControls } from '../components/EditorControls.tsx'
import { ExportPanel } from '../components/ExportPanel.tsx'
import { CultureSection } from '../components/CultureSection.tsx'
import { JsonLd } from '../components/JsonLd.tsx'
import { getPattern } from '../patterns/index.ts'
import { useEditorParams } from '../hooks/useEditorParams.ts'

const SITE_URL = 'https://wagara-gen.pages.dev'

export function EditorPage() {
  const { pattern: patternId } = useParams<{ pattern: string }>()
  const t = useT()
  const lang = useLang()

  const pattern = patternId ? getPattern(patternId) : undefined

  const [params, setParams] = useEditorParams(
    patternId ?? '',
    pattern?.defaultParams ?? {
      color1: '#333333',
      color2: '#ffffff',
      scale: 40,
      strokeWidth: 1,
      rotation: 0,
      opacity: 1,
    },
  )

  const handleReset = useCallback(() => {
    if (pattern) {
      setParams(pattern.defaultParams)
    }
  }, [pattern, setParams])

  if (!pattern) {
    return <Navigate to={`/${lang}/`} replace />
  }

  const info = t.patterns[pattern.id]

  return (
    <div className="editor-page">
      <PageHead
        title={`${info?.name ?? pattern.id} | ${t.common.siteTitle}`}
        description={info?.description ?? ''}
        path={`/${pattern.id}`}
      />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: `${info?.name ?? pattern.id} — ${t.common.siteTitle}`,
        description: info?.description ?? '',
        url: `${SITE_URL}/${lang}/${pattern.id}`,
        applicationCategory: 'DesignApplication',
        operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0' },
      }} />

      <header className="editor-header">
        <h1>{info?.name ?? pattern.id}</h1>
        <p>{info?.description ?? ''}</p>
      </header>

      <div className="editor-layout">
        <div className="editor-preview-area">
          <PatternPreview pattern={pattern} params={params} size={480} />
        </div>

        <aside className="editor-sidebar">
          <EditorControls
            pattern={pattern}
            params={params}
            onChange={setParams}
            onReset={handleReset}
          />
          <ExportPanel pattern={pattern} params={params} />
        </aside>
      </div>

      <CultureSection patternId={pattern.id} />
    </div>
  )
}
