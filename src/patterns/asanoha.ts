import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, strokeWidth, opacity } = params
  const s = scale
  const h = s * Math.sqrt(3) / 2

  // Asanoha: six lines radiating from center of each hexagonal cell,
  // forming a star pattern based on hemp leaf geometry
  const cx = s / 2
  const cy = h / 2

  // Six directions from center to edges of the diamond tile
  const lines = [
    // Vertical
    `<line x1="${cx}" y1="0" x2="${cx}" y2="${h}" />`,
    // Horizontal
    `<line x1="0" y1="${cy}" x2="${s}" y2="${cy}" />`,
    // Diagonals
    `<line x1="0" y1="0" x2="${s}" y2="${h}" />`,
    `<line x1="${s}" y1="0" x2="0" y2="${h}" />`,
    // Inner diamond lines - top half
    `<line x1="${cx}" y1="0" x2="${s * 0.75}" y2="${cy}" />`,
    `<line x1="${cx}" y1="0" x2="${s * 0.25}" y2="${cy}" />`,
    // Inner diamond lines - bottom half
    `<line x1="${cx}" y1="${h}" x2="${s * 0.75}" y2="${cy}" />`,
    `<line x1="${cx}" y1="${h}" x2="${s * 0.25}" y2="${cy}" />`,
    // Left side inner
    `<line x1="0" y1="0" x2="${cx}" y2="${cy}" />`,
    `<line x1="0" y1="${h}" x2="${cx}" y2="${cy}" />`,
    // Right side inner
    `<line x1="${s}" y1="0" x2="${cx}" y2="${cy}" />`,
    `<line x1="${s}" y1="${h}" x2="${cx}" y2="${cy}" />`,
  ]

  return `<g stroke="${color1}" stroke-width="${strokeWidth}" opacity="${opacity}" fill="none">${lines.join('')}</g>`
}

export const asanoha: PatternDefinition = {
  id: 'asanoha',
  generate,
  defaultParams: {
    color1: '#c85a4e',
    color2: '#f5f0e8',
    scale: 48,
    strokeWidth: 1,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: false,
}
