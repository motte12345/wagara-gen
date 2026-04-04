import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, strokeWidth, opacity } = params

  // Kagome: two overlapping equilateral triangles (up + down)
  // forming the characteristic six-pointed star pattern.
  // Tile: width = scale, height = scale * sqrt(3) / 2
  const w = scale
  const h = scale * Math.sqrt(3) / 2

  return `<path d="M0,${h} L${w / 2},0 L${w},${h} M0,0 L${w},0 L${w / 2},${h} M0,${h / 2} L${w},${h / 2}" fill="none" stroke="${color1}" stroke-width="${strokeWidth}" opacity="${opacity}" />`
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
  tileWidth: (scale) => scale,
  tileHeight: (scale) => scale * Math.sqrt(3) / 2,
}
