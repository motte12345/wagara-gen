import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, strokeWidth, opacity } = params
  const s = scale

  // Chidori: stylized plovers — simplified bird shapes in a grid
  // Each bird is a small V-shape (wings) with a dot (body)
  const birdSize = s * 0.3
  const cx = s / 2
  const cy = s / 2

  return [
    `<g stroke="${color1}" stroke-width="${strokeWidth}" fill="${color1}" opacity="${opacity}">`,
    // Body dot
    `<circle cx="${cx}" cy="${cy}" r="${birdSize * 0.15}" />`,
    // Left wing
    `<line x1="${cx}" y1="${cy}" x2="${cx - birdSize}" y2="${cy - birdSize * 0.6}" stroke-linecap="round" />`,
    // Right wing
    `<line x1="${cx}" y1="${cy}" x2="${cx + birdSize}" y2="${cy - birdSize * 0.6}" stroke-linecap="round" />`,
    // Tail
    `<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy + birdSize * 0.5}" stroke-linecap="round" />`,
    `</g>`,
  ].join('')
}

export const chidori: PatternDefinition = {
  id: 'chidori',
  generate,
  defaultParams: {
    color1: '#1a5276',
    color2: '#f5f0e8',
    scale: 48,
    strokeWidth: 1.5,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: false,
}
