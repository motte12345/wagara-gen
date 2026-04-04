import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, strokeWidth, opacity } = params
  const w = scale
  const h = scale
  const hw = w / 2
  const amp = w * 0.15

  // Tatewaku (rising steam): vertical undulating lines
  // Two wavy vertical lines that bulge outward alternately,
  // creating a rhythmic pattern of expanding and contracting space.

  // Left wavy line
  const leftLine = `M ${hw / 2 - amp},0 C ${hw / 2 + amp},${h * 0.25} ${hw / 2 + amp},${h * 0.25} ${hw / 2 - amp},${h * 0.5} C ${hw / 2 + amp},${h * 0.75} ${hw / 2 + amp},${h * 0.75} ${hw / 2 - amp},${h}`

  // Right wavy line (mirror of left, offset by half width)
  const rightLine = `M ${hw + hw / 2 + amp},0 C ${hw + hw / 2 - amp},${h * 0.25} ${hw + hw / 2 - amp},${h * 0.25} ${hw + hw / 2 + amp},${h * 0.5} C ${hw + hw / 2 - amp},${h * 0.75} ${hw + hw / 2 - amp},${h * 0.75} ${hw + hw / 2 + amp},${h}`

  return [
    `<g stroke="${color1}" stroke-width="${strokeWidth}" opacity="${opacity}" fill="none" stroke-linecap="round">`,
    `<path d="${leftLine}" />`,
    `<path d="${rightLine}" />`,
    `</g>`,
  ].join('')
}

export const tatewaku: PatternDefinition = {
  id: 'tatewaku',
  generate,
  defaultParams: {
    color1: '#7b5c8d',
    color2: '#f5f0e8',
    scale: 48,
    strokeWidth: 1.5,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: false,
}
