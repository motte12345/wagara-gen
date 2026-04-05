import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, strokeWidth, opacity } = params

  // Kikkou (tortoiseshell): regular hexagonal tiling.
  // Uses pointy-top hexagons.
  // Circumradius R = scale/2.
  // Tile: width = R*√3, height = R*3.

  const R = scale / 2
  const w = R * Math.sqrt(3)

  const hexVerts = (cx: number, cy: number): [number, number][] => {
    const verts: [number, number][] = []
    for (let i = 0; i < 6; i++) {
      const angle = -Math.PI / 2 + i * Math.PI / 3
      verts.push([cx + R * Math.cos(angle), cy + R * Math.sin(angle)])
    }
    return verts
  }

  const lines: string[] = []

  const centers: [number, number][] = [
    [w / 2, R],
    [0, 2.5 * R],
    [w, 2.5 * R],
    // Ghost hexes for clean edges
    [-w / 2, R],
    [w + w / 2, R],
    [w / 2, R + R * 3],
    [w / 2, R - R * 3],
  ]

  for (const [cx, cy] of centers) {
    const verts = hexVerts(cx, cy)
    for (let i = 0; i < 6; i++) {
      const [x1, y1] = verts[i]
      const [x2, y2] = verts[(i + 1) % 6]
      lines.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" />`)
    }
  }

  return `<g stroke="${color1}" stroke-width="${strokeWidth}" opacity="${opacity}" fill="none">${lines.join('')}</g>`
}

export const kikkou: PatternDefinition = {
  id: 'kikkou',
  category: 'textile',
  generate,
  defaultParams: {
    color1: '#2d6b4e',
    color2: '#f5f0e8',
    scale: 40,
    strokeWidth: 1.5,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: false,
  usesStroke: true,
  tileWidth: (scale) => (scale / 2) * Math.sqrt(3),
  tileHeight: (scale) => (scale / 2) * 3,
}
