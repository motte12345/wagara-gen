import type { PatternDefinition, PatternParams } from './types.ts'

// Fundou-tsunagi (分銅繋ぎ): interlocking weight shapes
// Base tile: 2×2
const PATH_D = 'm1 0a1 1 0 0 1 1 1a1 1 0 0 0-1 1a1 1 0 0 1-1-1a1 1 0 0 0 1-1z'

function generate(params: PatternParams): string {
  const { color1, color2, scale, opacity } = params
  const s = scale / 2

  return `<g transform="scale(${s})" opacity="${opacity}"><rect width="2" height="2" fill="${color2}" /><path d="${PATH_D}" fill="${color1}" /></g>`
}

export const fundou: PatternDefinition = {
  id: 'fundou',
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
