import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, strokeWidth, opacity } = params

  // Kagome (basket weave): three sets of parallel lines at 0°, 60°, 120°
  // forming hexagram (Star of David) shapes with hexagonal holes.
  //
  // Lines come in pairs — within each pair spacing is d, between pairs is 2d.
  // This creates the hexagonal holes characteristic of kagome.
  //
  // Tile: width = scale, height = scale * √3.

  const s = scale
  const h = s * Math.sqrt(3)

  // The kagome line spacing: pairs of lines separated by h/6,
  // with h/3 gap between pairs. Period = h/6 + h/3 = h/2.
  // 4 horizontal lines per tile at: h/6, h/3, h*2/3, h*5/6
  // This gives uniform pair spacing.
  const lines: string[] = []

  // Horizontal lines (pairs: [h/6, h/3] and [h*2/3, h*5/6])
  lines.push(`<line x1="0" y1="${h / 6}" x2="${s}" y2="${h / 6}" />`)
  lines.push(`<line x1="0" y1="${h / 3}" x2="${s}" y2="${h / 3}" />`)
  lines.push(`<line x1="0" y1="${h * 2 / 3}" x2="${s}" y2="${h * 2 / 3}" />`)
  lines.push(`<line x1="0" y1="${h * 5 / 6}" x2="${s}" y2="${h * 5 / 6}" />`)

  // Lines at 60° (bottom-left to top-right)
  const dx60 = h / Math.tan(Math.PI / 3)
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
