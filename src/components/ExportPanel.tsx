import { useState, useCallback, useMemo } from 'react'
import type { PatternDefinition, PatternParams } from '../patterns/types.ts'
import { useT, useLang } from '../i18n/index.ts'
import { SITE_URL } from '../constants.ts'
import { buildPatternSvg } from '../utils/svg-builder.ts'
import { svgToPng, downloadBlob, downloadSvg } from '../utils/export-png.ts'
import { generateCss } from '../utils/export-css.ts'
import { CopyButton } from './CopyButton.tsx'

interface ExportPanelProps {
  readonly pattern: PatternDefinition
  readonly params: PatternParams
}

const PNG_SIZES = [512, 1024, 2048] as const

export function ExportPanel({ pattern, params }: ExportPanelProps) {
  const t = useT()
  const lang = useLang()
  const [pngSize, setPngSize] = useState<number>(1024)
  const [exporting, setExporting] = useState(false)
  const [exportError, setExportError] = useState<string | null>(null)

  const svgString = useMemo(
    () => buildPatternSvg(pattern, params, 400, 400),
    [pattern, params],
  )
  const cssString = useMemo(
    () => generateCss(pattern, params),
    [pattern, params],
  )

  const handleDownloadSvg = useCallback(() => {
    const fullSvg = buildPatternSvg(pattern, params, pngSize, pngSize)
    downloadSvg(fullSvg, `${pattern.id}.svg`)
  }, [pattern, params, pngSize])

  const handleDownloadPng = useCallback(async () => {
    setExporting(true)
    setExportError(null)
    try {
      const fullSvg = buildPatternSvg(pattern, params, pngSize, pngSize)
      const blob = await svgToPng(fullSvg, pngSize)
      downloadBlob(blob, `${pattern.id}.png`)
    } catch (err) {
      console.error('PNG export failed:', err)
      setExportError('PNG export failed. Please try a smaller size.')
    } finally {
      setExporting(false)
    }
  }, [pattern, params, pngSize])

  return (
    <div className="export-panel">
      <h2>{t.editor.download}</h2>

      <div className="control-group">
        <label htmlFor="pngSize">{t.editor.pngSize}</label>
        <select
          id="pngSize"
          value={pngSize}
          onChange={(e) => setPngSize(Number(e.target.value))}
          className="size-select"
        >
          {PNG_SIZES.map((size) => (
            <option key={size} value={size}>
              {size} x {size}px
            </option>
          ))}
        </select>
      </div>

      <div className="export-buttons">
        <button
          type="button"
          className="btn btn--primary"
          onClick={handleDownloadSvg}
        >
          {t.editor.downloadSvg}
        </button>

        <button
          type="button"
          className="btn btn--primary"
          onClick={handleDownloadPng}
          disabled={exporting}
        >
          {exporting ? '...' : t.editor.downloadPng}
        </button>
      </div>

      {exportError && (
        <p className="export-error" role="alert">{exportError}</p>
      )}

      <div className="export-copy">
        <CopyButton text={svgString} label={t.editor.copySvg} />
        <CopyButton text={cssString} label={t.editor.copyCss} />
      </div>

      <h2>{t.editor.share}</h2>
      <div className="export-buttons">
        <a
          href={`https://x.com/intent/tweet?url=${encodeURIComponent(`${SITE_URL}/${lang}/${pattern.id}`)}&text=${encodeURIComponent(t.patterns[pattern.id]?.name ?? pattern.id)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--share"
        >
          {t.editor.shareTwitter}
        </a>
        <a
          href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(`${SITE_URL}/${lang}/${pattern.id}`)}&description=${encodeURIComponent(t.patterns[pattern.id]?.name ?? pattern.id)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--share"
        >
          {t.editor.sharePinterest}
        </a>
      </div>
    </div>
  )
}
