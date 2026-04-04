import type { PatternDefinition, PatternParams } from './types.ts'

// Kouji-tsunagi (工字繋ぎ): interlocking H-shapes
// Base tile: 10×10
const PATH_D = 'm0-1 4 4 2-2-1-1 1-1 2 2-7 7-2-2 1-1 1 1 2-2-4-4m0 2 2 2-2 2m0 2 7 7h-7m5-4 2-2 2 2m2 0-4-4-2 2 1 1-1 1-2-2 7-7 2 2-1 1-1-1-2 2 4 4m0-2-2-2 2-2m0-2-7-7h7m-5 4-2 2-2-2'

function generate(params: PatternParams): string {
  const { color1, color2, scale, opacity } = params
  const s = scale / 10

  return `<g transform="scale(${s})" opacity="${opacity}"><rect width="10" height="10" fill="${color2}" /><path d="${PATH_D}" fill="${color1}" /></g>`
}

export const kouji: PatternDefinition = {
  id: 'kouji',
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
