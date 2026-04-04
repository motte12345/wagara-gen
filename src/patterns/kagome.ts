import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, strokeWidth, opacity } = params
  const s = scale
  const h = s * Math.sqrt(3) / 2

  // Kagome (basket weave / Star of David pattern):
  // Overlapping upward and downward equilateral triangles forming hexagram stars.
  // The tile is a rectangle: width = scale, height = scale * sqrt(3)/2

  return [
    `<g stroke="${color1}" stroke-width="${strokeWidth}" opacity="${opacity}" fill="none">`,
    // Upward triangle
    `<polygon points="${s / 2},0 ${s},${h} 0,${h}" />`,
    // Downward triangle (inverted, offset)
    `<polygon points="0,${h / 3} ${s},${h / 3} ${s / 2},${h}" />`,
    `</g>`,
  ].join('')
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
  tileHeight: (scale) => scale * Math.sqrt(3) / 2,
}
