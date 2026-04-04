import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, strokeWidth, opacity } = params

  // Kagome: two overlapping equilateral triangles forming hexagram stars.
  // Upward △ and downward ▽ share the same center, creating a
  // Star of David at each tile. When tiled, the stars connect through
  // shared edges, forming the classic kagome basket-weave pattern
  // with hexagonal holes between the stars.
  //
  // Tile: width = scale, height = scale * √3.

  const s = scale
  const h = s * Math.sqrt(3)

  // Upward triangle: apex at top, base at middle
  const up = `${s / 2},0 0,${h / 2} ${s},${h / 2}`

  // Downward triangle: base at 1/3 from top, apex at 2/3 from top
  // Centered at the same point as the upward triangle
  const down = `0,${h / 6} ${s},${h / 6} ${s / 2},${h * 2 / 3}`

  return [
    `<g stroke="${color1}" stroke-width="${strokeWidth}" opacity="${opacity}" fill="none">`,
    `<polygon points="${up}" />`,
    `<polygon points="${down}" />`,
    `</g>`,
  ].join('')
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
  tileHeight: (scale) => scale * Math.sqrt(3),
}
