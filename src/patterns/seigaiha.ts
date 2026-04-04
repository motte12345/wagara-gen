import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, color2, color3, scale, strokeWidth, opacity } = params
  // Seigaiha: concentric semicircular arcs in overlapping rows.
  //
  // Reference: Shifty = (r, 0.75r) — each row shifts right by r, down by 0.75r.
  // This means the front row's dome extends 0.25r past the back row's center,
  // creating the characteristic overlap where dome edges peek out from behind.
  //
  // Rectangular tile: width = d = scale, height = 1.5r = 0.75*scale.
  // Row positions (SVG y-down, front row at bottom, back row at top):
  //   Back row:  y = 0.25r  (drawn first, behind)
  //   Front row: y = r      (drawn last, on top)
  //   Ghost back row: y = 1.75r (fills gap at tile bottom)

  const d = scale
  const r = d / 2
  const rings = 4
  const accent = color3 ?? color1

  const makeWaveUnit = (cx: number, cy: number): string => {
    const parts: string[] = []

    // Opaque filled semicircle (dome shape) — masks arcs behind
    parts.push(
      `<path d="M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy} Z" fill="${color2}" />`
    )

    // Concentric arc strokes
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
    // 1. Ghost back row at bottom (fills tile bottom gap)
    makeWaveUnit(0, r * 1.75),
    makeWaveUnit(d, r * 1.75),
    // 2. Back row (behind, near top of tile)
    makeWaveUnit(0, r * 0.25),
    makeWaveUnit(d, r * 0.25),
    // 3. Ghost front row at top (from tile above)
    makeWaveUnit(r, -r * 0.5),
    // 4. Front row (on top, near bottom of tile)
    makeWaveUnit(r, r),
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
  tileHeight: (scale) => scale * 0.75,
}
