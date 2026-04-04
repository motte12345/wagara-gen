import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, opacity } = params
  const s = scale
  const h = s * Math.sqrt(3) / 2

  // Uroko: isosceles triangles arranged in a scale-like pattern
  return [
    `<polygon points="0,${h} ${s / 2},0 ${s},${h}" fill="${color1}" opacity="${opacity}" />`,
  ].join('')
}

export const uroko: PatternDefinition = {
  id: 'uroko',
  generate,
  defaultParams: {
    color1: '#6b5b73',
    color2: '#f5f0e8',
    scale: 40,
    strokeWidth: 1,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: false,
  tileHeight: (scale) => scale * Math.sqrt(3) / 2,
}
