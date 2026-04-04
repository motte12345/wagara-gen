import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, strokeWidth, opacity } = params

  // Kagome: trihexagonal tiling — regular hexagons with equilateral
  // triangles on every edge, pointing outward.
  //
  // Hex side = circumradius R = scale/2.
  // Lattice vectors: a1=(2R, 0), a2=(R, R√3).
  // Tile: width=2R=scale, height=2R√3=scale*√3.

  const R = scale / 2
  const sqrt3 = Math.sqrt(3)

  const hexVerts = (cx: number, cy: number): [number, number][] => {
    const v: [number, number][] = []
    for (let i = 0; i < 6; i++) {
      const angle = -Math.PI / 2 + i * Math.PI / 3
      v.push([cx + R * Math.cos(angle), cy + R * Math.sin(angle)])
    }
    return v
  }

  const lines: string[] = []

  // Hex centers: lattice points n*(2R,0) + m*(R, R√3), plus ghosts
  const centers: [number, number][] = []
  for (let n = -1; n <= 2; n++) {
    for (let m = -1; m <= 2; m++) {
      centers.push([n * 2 * R + m * R, m * R * sqrt3])
    }
  }

  for (const [cx, cy] of centers) {
    const v = hexVerts(cx, cy)

    for (let i = 0; i < 6; i++) {
      const [x1, y1] = v[i]
      const [x2, y2] = v[(i + 1) % 6]

      // Hex edge
      lines.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" />`)

      // Outward triangle vertex
      const mx = (x1 + x2) / 2
      const my = (y1 + y2) / 2
      const dx = x2 - x1
      const dy = y2 - y1
      // Clockwise normal (outward from hex center)
      const th = R * sqrt3 / 2 // triangle height
      const tx = mx + th * dy / R
      const ty = my - th * dx / R

      // Triangle edges
      lines.push(`<line x1="${x1}" y1="${y1}" x2="${tx}" y2="${ty}" />`)
      lines.push(`<line x1="${x2}" y1="${y2}" x2="${tx}" y2="${ty}" />`)
    }
  }

  return `<g stroke="${color1}" stroke-width="${strokeWidth}" opacity="${opacity}" fill="none">${lines.join('')}</g>`
}

export const kagome: PatternDefinition = {
  id: 'kagome',
  generate,
  defaultParams: {
    color1: '#6b5b3d',
    color2: '#f5f0e8',
    scale: 40,
    strokeWidth: 1,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: false,
  tileHeight: (scale) => scale * Math.sqrt(3),
}
