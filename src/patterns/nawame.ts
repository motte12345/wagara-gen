import type { PatternDefinition, PatternParams } from './types.ts'

// Nawame-jima (縄目縞): rope stripe pattern
// Base tile: 20×20
const PATH_D = 'm0-25 2 2q-5 5 0 10t0 10 0 10 0 10 0 10l-2-2q-5-5 0-10t0-10 0-10 0-10 0-10zm5 5 2 2q-5 5 0 10t0 10 0 10 0 10 0 10l-2-2q-5-5 0-10t0-10 0-10 0-10 0-10zm5 5 2 2q-5 5 0 10t0 10 0 10 0 10 0 10l-2-2q-5-5 0-10t0-10 0-10 0-10 0-10zm5 5 2 2q-5 5 0 10t0 10 0 10 0 10 0 10l-2-2q-5-5 0-10t0-10 0-10 0-10 0-10zm5 5 2 2q-5 5 0 10t0 10 0 10 0 10 0 10l-2-2q-5-5 0-10t0-10 0-10 0-10 0-10z'

function generate(params: PatternParams): string {
  const { color1, scale, opacity } = params
  const s = scale / 20

  return `<g transform="scale(${s})" opacity="${opacity}"><path d="${PATH_D}" fill="${color1}" /></g>`
}

export const nawame: PatternDefinition = {
  id: 'nawame',
  category: 'textile',
  generate,
  defaultParams: {
    color1: '#808080',
    color2: '#cccccc',
    scale: 60,
    strokeWidth: 1,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: false,
}
