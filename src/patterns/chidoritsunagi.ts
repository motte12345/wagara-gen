import type { PatternDefinition, PatternParams } from './types.ts'

// Chidori-tsunagi (千鳥繋ぎ): linked plover / interlocking curved shapes
// Base tile: 24×24
const PATH_D = 'M6-6c0-4 6-4 6 0s6 4 6 0c4 0 4 6 0 6s-4 6 0 6c0 4-6 4-6 0s-6-4-6 0c-4 0-4-6 0-6s4-6 0-6zM-6 6c0-4 6-4 6 0s6 4 6 0c4 0 4 6 0 6s-4 6 0 6c0 4-6 4-6 0s-6-4-6 0c-4 0-4-6 0-6s4-6 0-6zM6 18c0-4 6-4 6 0s6 4 6 0c4 0 4 6 0 6s-4 6 0 6c0 4-6 4-6 0s-6-4-6 0c-4 0-4-6 0-6s4-6 0-6zM18 6c0-4 6-4 6 0s6 4 6 0c4 0 4 6 0 6s-4 6 0 6c0 4-6 4-6 0s-6-4-6 0c-4 0-4-6 0-6s4-6 0-6z'

function generate(params: PatternParams): string {
  const { color1, color2, scale, opacity } = params
  const s = scale / 24

  return `<g transform="scale(${s})" opacity="${opacity}"><rect width="24" height="24" fill="${color2}" /><path d="${PATH_D}" fill="${color1}" fill-rule="evenodd" /></g>`
}

export const chidoritsunagi: PatternDefinition = {
  id: 'chidoritsunagi',
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
