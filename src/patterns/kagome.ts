import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, strokeWidth, opacity } = params

  // Kagome (basket weave): two overlapping equilateral triangle grids
  // forming hexagram (Star of David) shapes, like bamboo basket weave.
  //
  // Constructed by drawing three sets of parallel lines at 0°, 60°, and 120°.
  // Tile: width = scale, height = scale * √3.
  // The triangles have side length = scale.

  const s = scale
  const h = s * Math.sqrt(3)
  const hh = h / 2

  const lines: string[] = []

  // Horizontal lines
  lines.push(`<line x1="0" y1="${hh / 3}" x2="${s}" y2="${hh / 3}" />`)
  lines.push(`<line x1="0" y1="${hh * 2 / 3}" x2="${s}" y2="${hh * 2 / 3}" />`)
  lines.push(`<line x1="0" y1="${hh + hh / 3}" x2="${s}" y2="${hh + hh / 3}" />`)
  lines.push(`<line x1="0" y1="${hh + hh * 2 / 3}" x2="${s}" y2="${hh + hh * 2 / 3}" />`)

  // Lines at 60° (bottom-left to top-right)
  // These cross the tile diagonally. Need multiple shifted copies.
  const dx60 = h / Math.tan(Math.PI / 3) // horizontal run for full tile height
  for (let i = -2; i <= 2; i++) {
    const startX = i * s / 2
    lines.push(`<line x1="${startX}" y1="${h}" x2="${startX + dx60}" y2="0" />`)
  }

  // Lines at 120° (bottom-right to top-left)
  for (let i = -2; i <= 2; i++) {
    const startX = i * s / 2
    lines.push(`<line x1="${startX + s}" y1="${h}" x2="${startX + s - dx60}" y2="0" />`)
  }

  return `<g stroke="${color1}" stroke-width="${strokeWidth}" opacity="${opacity}" fill="none">${lines.join('')}</g>`
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
  tileHeight: (scale) => scale * Math.sqrt(3),
}
