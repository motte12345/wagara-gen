import type { PatternDefinition, PatternParams } from './types.ts'

// Kazaguruma (風車): pinwheel pattern
// Base tile: 2×2
const PATH_D = 'm0 0h1v1l1-1v1h-1l1 1h-1v-1l-1 1v-1h1z'

function generate(params: PatternParams): string {
  const { color1, scale, opacity } = params
  const s = scale / 2

  return `<g transform="scale(${s})" opacity="${opacity}"><path d="${PATH_D}" fill="${color1}" /></g>`
}

export const kazaguruma: PatternDefinition = {
  id: 'kazaguruma',
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
