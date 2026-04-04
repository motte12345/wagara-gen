import type { PatternDefinition, PatternParams } from '../patterns/types.ts'
import { useT } from '../i18n/index.ts'

interface EditorControlsProps {
  readonly pattern: PatternDefinition
  readonly params: PatternParams
  readonly onChange: (params: PatternParams) => void
  readonly onReset: () => void
}

export function EditorControls({ pattern, params, onChange, onReset }: EditorControlsProps) {
  const t = useT()

  const update = <K extends keyof PatternParams>(key: K, value: PatternParams[K]) => {
    onChange({ ...params, [key]: value })
  }

  return (
    <div className="editor-controls">
      <div className="control-group">
        <label htmlFor="color1">{t.editor.color1}</label>
        <div className="color-input">
          <input
            id="color1"
            type="color"
            value={params.color1}
            onChange={(e) => update('color1', e.target.value)}
          />
          <input
            type="text"
            value={params.color1}
            onChange={(e) => update('color1', e.target.value)}
            maxLength={7}
            className="hex-input"
          />
        </div>
      </div>

      <div className="control-group">
        <label htmlFor="color2">{t.editor.color2}</label>
        <div className="color-input">
          <input
            id="color2"
            type="color"
            value={params.color2}
            onChange={(e) => update('color2', e.target.value)}
          />
          <input
            type="text"
            value={params.color2}
            onChange={(e) => update('color2', e.target.value)}
            maxLength={7}
            className="hex-input"
          />
        </div>
      </div>

      {pattern.hasAccentColor && (
        <div className="control-group">
          <label htmlFor="color3">{t.editor.color3}</label>
          <div className="color-input">
            <input
              id="color3"
              type="color"
              value={params.color3 ?? params.color1}
              onChange={(e) => update('color3', e.target.value)}
            />
            <input
              type="text"
              value={params.color3 ?? params.color1}
              onChange={(e) => update('color3', e.target.value)}
              maxLength={7}
              className="hex-input"
            />
          </div>
        </div>
      )}

      <div className="control-group">
        <label htmlFor="scale">
          {t.editor.scale}: {params.scale}px
        </label>
        <input
          id="scale"
          type="range"
          min={20}
          max={200}
          step={1}
          value={params.scale}
          onChange={(e) => update('scale', Number(e.target.value))}
        />
      </div>

      <div className="control-group">
        <label htmlFor="strokeWidth">
          {t.editor.strokeWidth}: {params.strokeWidth}px
        </label>
        <input
          id="strokeWidth"
          type="range"
          min={0.5}
          max={5}
          step={0.5}
          value={params.strokeWidth}
          onChange={(e) => update('strokeWidth', Number(e.target.value))}
        />
      </div>

      <div className="control-group">
        <label htmlFor="rotation">
          {t.editor.rotation}: {params.rotation}°
        </label>
        <input
          id="rotation"
          type="range"
          min={0}
          max={135}
          step={45}
          value={params.rotation}
          onChange={(e) => update('rotation', Number(e.target.value))}
        />
      </div>

      <div className="control-group">
        <label htmlFor="opacity">
          {t.editor.opacity}: {Math.round(params.opacity * 100)}%
        </label>
        <input
          id="opacity"
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={params.opacity}
          onChange={(e) => update('opacity', Number(e.target.value))}
        />
      </div>

      <button type="button" className="btn btn--secondary" onClick={onReset}>
        {t.editor.reset}
      </button>
    </div>
  )
}
