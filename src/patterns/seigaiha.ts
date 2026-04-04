import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, color3, scale, strokeWidth, opacity } = params
  const r = scale / 2
  const h = r // tile height = half scale
  const rings = 4
  const accent = color3 ?? color1

  // Seigaiha: concentric semicircular arcs in a wave pattern
  // Tile size: scale x (scale/2), with two arc groups offset

  const makeArcs = (cx: number, cy: number) => {
    const arcs: string[] = []
    for (let i = rings; i >= 1; i--) {
      const ri = (r * i) / rings
      const col = i === 2 ? accent : color1
      // Draw only the top half of the circle using an arc path
      arcs.push(
        `<path d="M ${cx - ri},${cy} A ${ri},${ri} 0 0,1 ${cx + ri},${cy}" fill="none" stroke="${col}" stroke-width="${strokeWidth}" />`
      )
    }
    return arcs.join('')
  }

  return [
    `<g opacity="${opacity}">`,
    // Main arc group at center-bottom of tile
    makeArcs(r, h),
    // Offset arc group — shifted right by r, up by h (wraps via pattern tiling)
    makeArcs(0, 0),
    makeArcs(scale, 0),
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
  tileHeight: (scale) => scale / 2,
}
