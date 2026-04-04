import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, strokeWidth, opacity } = params
  const r = scale / 2

  // Shippou: interlocking circles, each centered at grid intersections
  // The overlapping quarter-arcs form a flower-like pattern
  return [
    `<g stroke="${color1}" stroke-width="${strokeWidth}" fill="none" opacity="${opacity}">`,
    // Circle at each corner of the tile
    `<circle cx="0" cy="0" r="${r}" />`,
    `<circle cx="${scale}" cy="0" r="${r}" />`,
    `<circle cx="0" cy="${scale}" r="${r}" />`,
    `<circle cx="${scale}" cy="${scale}" r="${r}" />`,
    // Circle at center
    `<circle cx="${r}" cy="${r}" r="${r}" />`,
    `</g>`,
  ].join('')
}

export const shippou: PatternDefinition = {
  id: 'shippou',
  generate,
  defaultParams: {
    color1: '#8b6b3d',
    color2: '#f5f0e8',
    scale: 48,
    strokeWidth: 1.5,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: false,
}
