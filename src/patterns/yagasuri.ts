import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, opacity } = params

  // Yagasuri (矢絣): filled arrow-feather chevrons with vertical dividers
  // Base tile: 80×120, two columns of alternating chevrons
  const s = scale / 80
  const p = (x: number, y: number) => `${x * s},${y * s}`

  const d = [
    // Chevron at (0,0)-(40,60)
    `M${p(0,0)}L${p(19,19)}L${p(21,19)}L${p(40,0)}L${p(40,60)}L${p(21,79)}L${p(19,79)}L${p(0,60)}Z`,
    // Vertical line at x=19-21
    `M${p(19,-60)}L${p(21,-60)}L${p(21,180)}L${p(19,180)}Z`,
    // Chevron at (40,-60)-(80,0)
    `M${p(40,-60)}L${p(59,-41)}L${p(61,-41)}L${p(80,-60)}L${p(80,0)}L${p(61,19)}L${p(59,19)}L${p(40,0)}Z`,
    // Vertical line at x=59-61
    `M${p(59,-60)}L${p(61,-60)}L${p(61,180)}L${p(59,180)}Z`,
    // Chevron at (40,60)-(80,120)
    `M${p(40,60)}L${p(59,79)}L${p(61,79)}L${p(80,60)}L${p(80,120)}L${p(61,139)}L${p(59,139)}L${p(40,120)}Z`,
  ].join('')

  return `<path d="${d}" fill="${color1}" fill-rule="evenodd" opacity="${opacity}" />`
}

export const yagasuri: PatternDefinition = {
  id: 'yagasuri',
  category: 'textile',
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
  tileHeight: (scale) => scale * 1.5,
}
