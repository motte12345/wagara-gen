import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, strokeWidth, opacity } = params

  // Asanoha (hemp leaf): based on regular hexagons.
  // Each hexagon has lines from center to all 6 vertices,
  // plus lines from center to the midpoint of each edge.
  // This creates 6 diamond/rhombus shapes inside each hexagon.
  //
  // Tile: a rectangle containing two half-hexagons that tile seamlessly.
  // Width = scale, Height = scale * sqrt(3)
  // The tile contains one full hexagon unit (top half + bottom half offset).

  const w = scale
  const h = scale * Math.sqrt(3)
  const hw = w / 2
  const hh = h / 2
  const qh = h / 4

  // Hexagon vertices (centered at hw, hh):
  //   top: (hw, 0)
  //   top-right: (w, qh)
  //   bottom-right: (w, qh*3)
  //   bottom: (hw, h)
  //   bottom-left: (0, qh*3)
  //   top-left: (0, qh)

  const lines: string[] = []

  // --- Upper hexagon center at (hw, qh*2) = (hw, hh) ---
  const cx = hw
  const cy = hh

  // 6 vertices of the hexagon
  const verts = [
    [hw, 0],       // top
    [w, qh],       // top-right
    [w, qh * 3],   // bottom-right
    [hw, h],       // bottom
    [0, qh * 3],   // bottom-left
    [0, qh],       // top-left
  ] as const

  // Lines from center to each vertex
  for (const [vx, vy] of verts) {
    lines.push(`<line x1="${cx}" y1="${cy}" x2="${vx}" y2="${vy}" />`)
  }

  // Lines from center to midpoint of each edge
  for (let i = 0; i < 6; i++) {
    const [x1, y1] = verts[i]
    const [x2, y2] = verts[(i + 1) % 6]
    const mx = (x1 + x2) / 2
    const my = (y1 + y2) / 2
    lines.push(`<line x1="${cx}" y1="${cy}" x2="${mx}" y2="${my}" />`)
  }

  // Hexagon outline edges
  for (let i = 0; i < 6; i++) {
    const [x1, y1] = verts[i]
    const [x2, y2] = verts[(i + 1) % 6]
    lines.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" />`)
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
  tileHeight: (scale) => scale * Math.sqrt(3),
}
