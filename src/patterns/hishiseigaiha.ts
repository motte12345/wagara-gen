import type { PatternDefinition, PatternParams } from './types.ts'

// Hishi-seigaiha (菱青海波): diamond wave pattern
// Base tile: 24×24
const PATH_D = [
  'M1 13l11-11 11 11-2 2-9-9-9 9z',
  'm3 3 8-8 8 8-2 2-6-6-6 6z',
  'm3 3 5-5 5 5-2 2-3-3-3 3z',
  'm3 3 2-2 2 2-2 2z',
  'M-11 1l11-11 11 11-2 2-9-9-9 9z',
  'm3 3 8-8 8 8-2 2-6-6-6 6z',
  'm3 3 5-5 5 5-2 2-3-3-3 3z',
  'm3 3 2-2 2 2-2 2z',
  'M13 1l11-11 11 11-2 2-9-9-9 9z',
  'm3 3 8-8 8 8-2 2-6-6-6 6z',
  'm3 3 5-5 5 5-2 2-3-3-3 3z',
  'm3 3 2-2 2 2-2 2z',
  'M-11 25l11-11 11 11-2 2-9-9-9 9z',
  'm3 3 8-8 8 8-2 2-6-6-6 6z',
  'M13 25l11-11 11 11-2 2-9-9-9 9z',
  'm3 3 8-8 8 8-2 2-6-6-6 6z',
].join('')

function generate(params: PatternParams): string {
  const { color1, scale, opacity } = params
  const s = scale / 24

  return `<g transform="scale(${s})" opacity="${opacity}"><path d="${PATH_D}" fill="${color1}" /></g>`
}

export const hishiseigaiha: PatternDefinition = {
  id: 'hishiseigaiha',
  category: 'geometric',
  generate,
  defaultParams: {
    color1: '#808080',
    color2: '#cccccc',
    scale: 72,
    strokeWidth: 1,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: false,
}
