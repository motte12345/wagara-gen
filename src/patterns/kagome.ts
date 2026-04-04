import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, strokeWidth, opacity } = params

  // Kagome (basket weave): hexagram (Star of David) lattice.
  // Two overlapping equilateral triangles at each hexagonal lattice point.
  // Uses the same pointy-top hex grid as asanoha/kikkou.
  // Circumradius R = scale/2. Tile: width = R*√3, height = R*3.

  const R = scale / 2
  const w = R * Math.sqrt(3)

  const drawHexagram = (cx: number, cy: number): string => {
    const parts: string[] = []

    // Upward triangle: vertices at -90°, 30°, 150°
    const upAngles = [-Math.PI / 2, Math.PI / 6, Math.PI * 5 / 6]
    const upVerts = upAngles.map((a) => [cx + R * Math.cos(a), cy + R * Math.sin(a)])
    parts.push(
      `<polygon points="${upVerts.map(([x, y]) => `${x},${y}`).join(' ')}" />`
    )

    // Downward triangle: vertices at 90°, -30°, -150°
    const downAngles = [Math.PI / 2, -Math.PI / 6, -Math.PI * 5 / 6]
    const downVerts = downAngles.map((a) => [cx + R * Math.cos(a), cy + R * Math.sin(a)])
    parts.push(
      `<polygon points="${downVerts.map(([x, y]) => `${x},${y}`).join(' ')}" />`
    )

    return parts.join('')
  }

  const parts: string[] = []

  // Hex grid centers (same as asanoha/kikkou) + ghosts for clean tiling
  const h = R * 3
  const centers: [number, number][] = [
    [w / 2, R],
    [0, 2.5 * R],
    [w, 2.5 * R],
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
    parts.push(drawHexagram(cx, cy))
  }

  return `<g stroke="${color1}" stroke-width="${strokeWidth}" opacity="${opacity}" fill="none">${parts.join('')}</g>`
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
  tileWidth: (scale) => (scale / 2) * Math.sqrt(3),
  tileHeight: (scale) => (scale / 2) * 3,
}
