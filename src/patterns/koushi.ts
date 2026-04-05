import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, strokeWidth, opacity } = params
  const s = scale

  // Koushi: simple lattice/grid pattern
  return [
    `<g stroke="${color1}" stroke-width="${strokeWidth}" opacity="${opacity}">`,
    // Vertical line
    `<line x1="${s / 2}" y1="0" x2="${s / 2}" y2="${s}" />`,
    // Horizontal line
    `<line x1="0" y1="${s / 2}" x2="${s}" y2="${s / 2}" />`,
    `</g>`,
  ].join('')
}

export const koushi: PatternDefinition = {
  id: 'koushi',
  category: 'geometric',
  generate,
  defaultParams: {
    color1: '#5d4e37',
    color2: '#f5f0e8',
    scale: 40,
    strokeWidth: 1,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: false,
  usesStroke: true,
}
