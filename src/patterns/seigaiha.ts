import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, color3, scale, strokeWidth, opacity } = params
  // Seigaiha: concentric semicircles in a brick-like offset arrangement.
  // Each wave unit is a set of concentric upper-semicircular arcs.
  // Rows are tightly packed with deep overlap, like fish scales.
  //
  // Tile: width = scale (diameter), height = scale/3 (tight vertical packing).
  // Row spacing = tile_height / 2 = scale/6.
  // Each arc has max radius = scale/2, extending well beyond the tile,
  // creating deep overlap with rows above and below.

  const d = scale          // diameter of one wave unit
  const r = d / 2          // radius
  const th = d / 3         // tile height (tight packing)
  const rings = 4
  const accent = color3 ?? color1

  const makeArcs = (cx: number, cy: number): string => {
    const arcs: string[] = []
    for (let i = rings; i >= 1; i--) {
      const ri = (r * i) / rings
      const col = i === 2 ? accent : color1
      arcs.push(
        `<path d="M ${cx - ri},${cy} A ${ri},${ri} 0 0,1 ${cx + ri},${cy}" fill="none" stroke="${col}" stroke-width="${strokeWidth}" />`
      )
    }
    return arcs.join('')
  }

  return [
    `<g opacity="${opacity}">`,
    // Row 0: arcs centered at bottom of tile
    makeArcs(r, th),
    // Row 1 (offset): arcs centered at mid-height, shifted by half diameter
    makeArcs(0, th / 2),
    makeArcs(d, th / 2),
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
  tileHeight: (scale) => scale / 3,
}
