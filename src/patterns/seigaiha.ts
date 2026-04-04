import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, color2, color3, scale, strokeWidth, opacity } = params
  // Seigaiha: concentric semicircular arcs in overlapping rows.
  //
  // Based on the parallelogram tiling approach:
  //   Shiftx = (d, 0)       — horizontal period = diameter
  //   Shifty = (r, r)       — each row shifts right by r AND down by r
  //
  // Rectangular tile: width = d = scale, height = 2r = scale.
  // Contains two rows:
  //   Back row  (drawn first): centers at (0, r/2) and (d, r/2)
  //   Front row (drawn second): center at (r, 3r/2)
  //
  // Each dome has a filled semicircle (background) to mask the row behind it.

  const d = scale
  const r = d / 2
  const rings = 4
  const accent = color3 ?? color1

  const makeWaveUnit = (cx: number, cy: number): string => {
    const parts: string[] = []

    // Opaque filled semicircle — masks arcs behind this dome
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
    // Back row (behind): at y = r/2, offset at tile edges
    makeWaveUnit(0, r / 2),
    makeWaveUnit(d, r / 2),
    // Front row (on top): at y = 3r/2, centered
    makeWaveUnit(r, r * 3 / 2),
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
  // tileHeight = scale (= 2r), same as width — no override needed
}
