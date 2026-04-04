import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, color2: _bg, scale, strokeWidth, opacity } = params

  // Yagasuri (arrow feathers): columns of arrow-fletching shapes.
  // Each feather is a rectangle with diagonal lines (barbs).
  // Adjacent columns point in opposite directions.
  // Tile: width = scale, height = scale.

  const s = scale
  const hw = s / 2  // half width (one column)
  const barbs = 4   // number of diagonal barb lines per feather

  const lines: string[] = []

  // Column dividers
  lines.push(`<line x1="${hw}" y1="0" x2="${hw}" y2="${s}" />`)

  // Left column: barbs going upper-left to lower-right (arrow pointing up)
  for (let i = 0; i <= barbs; i++) {
    const y = (s * i) / barbs
    // Diagonal from left edge to center line
    lines.push(`<line x1="0" y1="${y}" x2="${hw}" y2="${y}" />`)
  }
  // Diagonal barb lines within left column
  for (let i = 0; i < barbs; i++) {
    const y1 = (s * i) / barbs
    const y2 = (s * (i + 1)) / barbs
    // Each feather section has a diagonal line
    lines.push(`<line x1="0" y1="${y2}" x2="${hw}" y2="${y1}" />`)
  }

  // Right column: barbs in opposite direction (arrow pointing down)
  for (let i = 0; i <= barbs; i++) {
    const y = (s * i) / barbs
    lines.push(`<line x1="${hw}" y1="${y}" x2="${s}" y2="${y}" />`)
  }
  for (let i = 0; i < barbs; i++) {
    const y1 = (s * i) / barbs
    const y2 = (s * (i + 1)) / barbs
    lines.push(`<line x1="${hw}" y1="${y1}" x2="${s}" y2="${y2}" />`)
  }

  void _bg
  return `<g stroke="${color1}" stroke-width="${strokeWidth}" opacity="${opacity}" fill="none">${lines.join('')}</g>`
}

export const yagasuri: PatternDefinition = {
  id: 'yagasuri',
  generate,
  defaultParams: {
    color1: '#8b2252',
    color2: '#f5f0e8',
    scale: 40,
    strokeWidth: 1,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: false,
}
