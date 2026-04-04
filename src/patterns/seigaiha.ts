import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, color3, scale, strokeWidth, opacity } = params
  // Seigaiha: concentric semicircles in a brick-like offset arrangement.
  // Tile: width = scale (one unit diameter), height = scale/2 (one unit radius).
  // Row 0 arcs at bottom-center, row 1 arcs at top corners (offset by half).
  const d = scale          // diameter of one wave unit
  const r = d / 2          // radius
  const rings = 4
  const accent = color3 ?? color1

  const makeArcs = (cx: number, cy: number): string => {
    const arcs: string[] = []
    for (let i = rings; i >= 1; i--) {
      const ri = (r * i) / rings
      const col = i === 2 ? accent : color1
      // Upper semicircle arc: from (cx-ri, cy) to (cx+ri, cy) going through top
      arcs.push(
        `<path d="M ${cx - ri},${cy} A ${ri},${ri} 0 0,1 ${cx + ri},${cy}" fill="none" stroke="${col}" stroke-width="${strokeWidth}" />`
      )
    }
    return arcs.join('')
  }

  return [
    `<g opacity="${opacity}">`,
    // Row 0: arcs centered at bottom-center of tile
    makeArcs(r, r),
    // Row 1 (offset): arcs centered at top-left and top-right corners
    makeArcs(0, 0),
    makeArcs(d, 0),
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
