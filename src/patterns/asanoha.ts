import type { PatternDefinition, PatternParams } from './types.ts'

// Asanoha (麻の葉): filled diamond-star pattern
// Base tile: 140×80
const PATH_D = [
  'M4 1h42l21 36z',
  'M3 3l63 36h-42z',
  'M1 4l21 36-21 36z',
  'M3 77l21-36h42z',
  'M46 79h-42l63-36z',
  'M69 44v41h-24z',
  'M95 85h-24v-41z',
  'M73 43l63 36h-42z',
  'M74 41h42l21 36z',
  'M118 40l21-36v72z',
  'M137 3l-21 36h-42z',
  'M94 1h42l-63 36z',
  'M71 36v-41h24z',
  'M45-5h24v41z',
].join('')

function generate(params: PatternParams): string {
  const { color1, scale, opacity } = params

  const s = scale / 140

  return `<g transform="scale(${s})" opacity="${opacity}"><path d="${PATH_D}" fill="${color1}" /></g>`
}

export const asanoha: PatternDefinition = {
  id: 'asanoha',
  category: 'nature',
  generate,
  defaultParams: {
    color1: '#808080',
    color2: '#cccccc',
    scale: 140,
    strokeWidth: 1,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: false,
  tileWidth: (scale) => scale,
  tileHeight: (scale) => scale * 80 / 140,
}
