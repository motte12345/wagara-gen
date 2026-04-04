import type { PatternDefinition, PatternParams } from './types.ts'

// Juuji-tsunagi (十字繋ぎ): interlocking cross pattern
// Base tile: 10×10, stroke-based
const PATH_D = 'M-1 7h1v2h1v1M-1 2h1v2h1v2h1v2h1v2h1v1M-1 1h1v-1h1v1h1v2h1v2h1v2h1v2h1v1M3-1v1h1v2h1v2h1v2h1v2h1v2h1v1M5 0h1v1h1v2h1v2h1v2h1v2h1M8-1v1h1v2h1v2h1M0 3h1v-1h2v-1h2v-1h2v-1M-1 6h1v-1h2v-1h2v-1h2v-1h2v-1h2v-1h1M0 8h1v-1h2v-1h2v-1h2v-1h2v-1h1M0 10h2v-1h2v-1h2v-1h2v-1h2v-1h1M5 11v-1h2v-1h2v-1h1M1 0h1v-1M10 11v-1h1'

function generate(params: PatternParams): string {
  const { color1, color2, scale, strokeWidth, opacity } = params
  const s = scale / 10

  return `<g transform="scale(${s})" opacity="${opacity}"><rect width="10" height="10" fill="${color2}" /><path d="${PATH_D}" fill="none" stroke="${color1}" stroke-width="${strokeWidth / s}" /></g>`
}

export const juuji: PatternDefinition = {
  id: 'juuji',
  generate,
  defaultParams: {
    color1: '#333333',
    color2: '#cccccc',
    scale: 60,
    strokeWidth: 0.6,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: false,
}
