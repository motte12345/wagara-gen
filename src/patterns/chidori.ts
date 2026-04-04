import type { PatternDefinition, PatternParams } from './types.ts'

// Chidori (千鳥格子 / houndstooth): filled geometric tooth pattern
// Base tile: 4×4
const PATH_D = 'm3-1-3 3h1l1-1v1h1l-1 1v1l3-3v1l-3 3h-3v-3l3-3z'

function generate(params: PatternParams): string {
  const { color1, scale, opacity } = params

  const s = scale / 4

  return `<g transform="scale(${s})" opacity="${opacity}"><path d="${PATH_D}" fill="${color1}" /></g>`
}

export const chidori: PatternDefinition = {
  id: 'chidori',
  generate,
  defaultParams: {
    color1: '#808080',
    color2: '#cccccc',
    scale: 48,
    strokeWidth: 1,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: false,
}
