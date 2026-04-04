import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, strokeWidth, opacity } = params

  // Kagome (basket weave): regular triangular grid.
  // Three sets of parallel lines at 0°, 60°, -60° with equal spacing
  // forming equilateral triangles of side `scale`.
  //
  // Tile: width = scale, height = scale * √3.
  // Lines:
  //   1. Horizontal at y=0 (tile edge) and y=h/2 (middle)
  //   2. Main diagonal: (0, 0) → (s, h)
  //   3. Anti-diagonal: (0, h) → (s, 0)

  const s = scale
  const h = s * Math.sqrt(3)

  return [
    `<g stroke="${color1}" stroke-width="${strokeWidth}" opacity="${opacity}" fill="none">`,
    // Horizontal lines
    `<line x1="0" y1="0" x2="${s}" y2="0" />`,
    `<line x1="0" y1="${h / 2}" x2="${s}" y2="${h / 2}" />`,
    // 60° diagonal: top-left to bottom-right
    `<line x1="0" y1="0" x2="${s}" y2="${h}" />`,
    // -60° anti-diagonal: bottom-left to top-right
    `<line x1="0" y1="${h}" x2="${s}" y2="0" />`,
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
