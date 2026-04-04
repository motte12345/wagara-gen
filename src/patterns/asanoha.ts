import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, strokeWidth, opacity } = params

  // Asanoha (hemp leaf): hexagonal star pattern.
  // Each hexagon contains lines from center to all 6 vertices AND
  // from center to all 6 edge midpoints, creating 6 diamond shapes.
  //
  // Uses pointy-top hexagons.
  // Circumradius R = scale/2 (center to vertex distance).
  // Tile: width = R*√3, height = R*3.
  // Hex centers: A at (w/2, R), B at (0, 2.5R), B' at (w, 2.5R).

  const R = scale / 2
  const w = R * Math.sqrt(3)
  const h = R * 3

  // Compute pointy-top hex vertices relative to center
  const hexVerts = (cx: number, cy: number): [number, number][] => {
    const verts: [number, number][] = []
    for (let i = 0; i < 6; i++) {
      const angle = -Math.PI / 2 + i * Math.PI / 3
      verts.push([cx + R * Math.cos(angle), cy + R * Math.sin(angle)])
    }
    return verts
  }

  const lines: string[] = []

  // Draw all hex structures from multiple centers (including ghost hexes for tiling)
  const centers: [number, number][] = [
    [w / 2, R],           // Hex A (primary)
    [0, 2.5 * R],         // Hex B (bottom-left)
    [w, 2.5 * R],         // Hex B' (bottom-right)
    // Ghost hexes for seamless edge coverage
    [-w / 2, R],
    [w + w / 2, R],
    [w / 2, R - h],
    [0, 2.5 * R - h],
    [w, 2.5 * R - h],
    [w / 2, R + h],
    [0, 2.5 * R + h],
    [w, 2.5 * R + h],
  ]

  for (const [cx, cy] of centers) {
    const verts = hexVerts(cx, cy)

    // Hex outline edges
    for (let i = 0; i < 6; i++) {
      const [x1, y1] = verts[i]
      const [x2, y2] = verts[(i + 1) % 6]
      lines.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" />`)
    }

    // Center to each vertex
    for (const [vx, vy] of verts) {
      lines.push(`<line x1="${cx}" y1="${cy}" x2="${vx}" y2="${vy}" />`)
    }

    // Center to midpoint of each edge
    for (let i = 0; i < 6; i++) {
      const [x1, y1] = verts[i]
      const [x2, y2] = verts[(i + 1) % 6]
      lines.push(`<line x1="${cx}" y1="${cy}" x2="${(x1 + x2) / 2}" y2="${(y1 + y2) / 2}" />`)
    }
  }

  return `<g stroke="${color1}" stroke-width="${strokeWidth}" opacity="${opacity}" fill="none">${lines.join('')}</g>`
}

export const asanoha: PatternDefinition = {
  id: 'asanoha',
  generate,
  defaultParams: {
    color1: '#c85a4e',
    color2: '#f5f0e8',
    scale: 40,
    strokeWidth: 1,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: false,
  tileWidth: (scale) => (scale / 2) * Math.sqrt(3),
  tileHeight: (scale) => (scale / 2) * 3,
}
