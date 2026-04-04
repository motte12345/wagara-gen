import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, strokeWidth, opacity } = params

  // Kagome: overlapping regular hexagon outlines.
  // The hexagons overlap, and the overlapping edges create
  // the characteristic six-pointed star + hexagonal hole pattern.
  //
  // From reference: flat-top hexagons, radius R = scale/2.
  // Shiftx = (R√3/2, R/2) — diagonal shift
  // Shifty = (0, R) — vertical shift
  // Rectangular tile: width = R√3, height = R.

  const R = scale / 2
  const sqrt3 = Math.sqrt(3)
  // Flat-top hex vertices at (cx, cy)
  const hexPoints = (cx: number, cy: number): string => {
    const v: string[] = []
    for (let i = 0; i < 6; i++) {
      const angle = i * Math.PI / 3  // flat-top: starts at 0°
      v.push(`${cx + R * Math.cos(angle)},${cy + R * Math.sin(angle)}`)
    }
    return v.join(' ')
  }

  const polys: string[] = []

  // Generate hex centers: n * Shiftx + m * Shifty, with enough ghosts
  for (let n = -2; n <= 3; n++) {
    for (let m = -2; m <= 2; m++) {
      const cx = n * R * sqrt3 / 2 + m * 0
      const cy = n * R / 2 + m * R
      polys.push(`<polygon points="${hexPoints(cx, cy)}" />`)
    }
  }

  return `<g stroke="${color1}" stroke-width="${strokeWidth}" opacity="${opacity}" fill="none">${polys.join('')}</g>`
}

export const kagome: PatternDefinition = {
  id: 'kagome',
  generate,
  defaultParams: {
    color1: '#6b5b3d',
    color2: '#f5f0e8',
    scale: 48,
    strokeWidth: 1,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: false,
  tileWidth: (scale) => (scale / 2) * Math.sqrt(3),
  tileHeight: (scale) => scale / 2,
}
