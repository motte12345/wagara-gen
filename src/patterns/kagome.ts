import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, strokeWidth, opacity } = params

  // Kagome: two diagonals + two horizontals in a 2:3 tile
  // Reference: viewBox 160×240, lines at y=60 and y=180
  const w = scale
  const h = scale * 1.5

  return `<path d="M0,0 L${w},${h} M0,${h} L${w},0 M0,${h / 4} L${w},${h / 4} M0,${h * 3 / 4} L${w},${h * 3 / 4}" fill="none" stroke="${color1}" stroke-width="${strokeWidth}" opacity="${opacity}" />`
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
  usesStroke: true,
  tileWidth: (scale) => scale,
  tileHeight: (scale) => scale * 1.5,
}
