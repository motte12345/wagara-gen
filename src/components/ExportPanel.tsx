import { useState, useCallback } from 'react'
import type { PatternDefinition, PatternParams } from '../patterns/types.ts'
import { useT } from '../i18n/index.ts'
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
  const [pngSize, setPngSize] = useState<number>(1024)
  const [exporting, setExporting] = useState(false)

  const svgString = buildPatternSvg(pattern, params, 400, 400)
  const cssString = generateCss(pattern, params)

  const handleDownloadSvg = useCallback(() => {
    const fullSvg = buildPatternSvg(pattern, params, pngSize, pngSize)
    downloadSvg(fullSvg, `${pattern.id}.svg`)
  }, [pattern, params, pngSize])

  const handleDownloadPng = useCallback(async () => {
    setExporting(true)
    try {
      const fullSvg = buildPatternSvg(pattern, params, pngSize, pngSize)
      const blob = await svgToPng(fullSvg, pngSize)
      downloadBlob(blob, `${pattern.id}.png`)
    } catch (err) {
      console.error('PNG export failed:', err)
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

      <div className="export-copy">
        <CopyButton text={svgString} label={t.editor.copySvg} />
        <CopyButton text={cssString} label={t.editor.copyCss} />
      </div>
    </div>
  )
}
