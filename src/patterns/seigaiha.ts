import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, color2, color3, scale, strokeWidth, opacity } = params
  // Seigaiha: concentric semicircles in overlapping rows.
  // Each wave dome is OPAQUE — a filled semicircle (background color)
  // with concentric arc strokes on top. This way, front-row domes
  // naturally mask back-row domes, creating the classic layered look.
  //
  // Tile: width = scale, height = scale/2.
  // Back row (offset) drawn first, front row drawn on top.

  const d = scale
  const r = d / 2
  const th = r * 0.7     // tile height (tight packing — each dome ~35% visible)
  const rings = 4
  const accent = color3 ?? color1

  const makeWaveUnit = (cx: number, cy: number): string => {
    const parts: string[] = []

    // 1. Opaque filled semicircle — masks everything behind this dome
    parts.push(
      `<path d="M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy} Z" fill="${color2}" />`
    )

    // 2. Concentric arc strokes (largest to smallest)
    for (let i = rings; i >= 1; i--) {
      const ri = (r * i) / rings
      const col = i === 2 ? accent : color1
      parts.push(
        `<path d="M ${cx - ri},${cy} A ${ri},${ri} 0 0,1 ${cx + ri},${cy}" fill="none" stroke="${col}" stroke-width="${strokeWidth}" />`
      )
    }

    return parts.join('')
  }

  return [
    `<g opacity="${opacity}">`,
    // Back row (drawn first = behind): offset by half diameter, at mid-tile
    makeWaveUnit(0, th / 2),
    makeWaveUnit(d, th / 2),
    // Front row (drawn second = on top): centered, at bottom of tile
    makeWaveUnit(r, th),
    `</g>`,
  ].join('')
}

export const seigaiha: PatternDefinition = {
  id: 'seigaiha',
  generate,
  defaultParams: {
    color1: '#2b5797',
    color2: '#f5f0e8',
    color3: '#4a90d9',
    scale: 60,
    strokeWidth: 1,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: true,
  tileHeight: (scale) => scale * 0.35,
}
