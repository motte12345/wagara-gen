import type { PatternDefinition, PatternParams } from './types.ts'

// Matsukawa-bishi (松皮菱): pine bark diamond
// Base tile: 20×14
const PATH_D = 'm10 0 6 3-2 1 6 3-6 3 2 1-6 3-6-3 2-1-6-3 6-3-2-1z'

function generate(params: PatternParams): string {
  const { color1, color2, scale, opacity } = params
  const s = scale / 20

  return `<g transform="scale(${s})" opacity="${opacity}"><rect width="20" height="14" fill="${color2}" /><path d="${PATH_D}" fill="${color1}" /></g>`
}

export const matsukawa: PatternDefinition = {
  id: 'matsukawa',
  generate,
  defaultParams: {
    color1: '#808080',
    color2: '#cccccc',
    scale: 80,
    strokeWidth: 1,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: false,
  tileWidth: (scale) => scale,
  tileHeight: (scale) => scale * 14 / 20,
}
