import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, strokeWidth, opacity } = params

  // Sayagata (紗綾形): interlocking manji pattern
  // Base tile: 20×10, path extends beyond for seamless tiling
  const s = scale / 20
  const p = (x: number, y: number) => `${x * s},${y * s}`

  const d = [
    `M${p(1,8)}`, `L${p(15,1)}`, `L${p(17,2)}`, `L${p(15,3)}`, `L${p(17,4)}`,
    `L${p(15,5)}`, `L${p(13,4)}`, `L${p(11,5)}`, `L${p(25,12)}`, `L${p(27,11)}`,
    `L${p(25,10)}`, `L${p(27,9)}`, `L${p(29,10)}`, `L${p(31,9)}`, `L${p(33,10)}`,
    `L${p(19,17)}`, `L${p(17,16)}`, `L${p(19,15)}`, `L${p(17,14)}`, `L${p(19,13)}`,
    `L${p(21,14)}`, `L${p(23,13)}`, `L${p(9,6)}`, `L${p(7,7)}`, `L${p(9,8)}`,
    `L${p(7,9)}`, `L${p(5,8)}`, `L${p(3,9)}`, `L${p(1,8)}`, 'Z',
  ].join(' ')

  return `<path d="${d}" fill="none" stroke="${color1}" stroke-width="${strokeWidth}" opacity="${opacity}" />`
}

export const sayagata: PatternDefinition = {
  id: 'sayagata',
  generate,
  defaultParams: {
    color1: '#3d3d6b',
    color2: '#f5f0e8',
    scale: 48,
    strokeWidth: 1.5,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: false,
  tileWidth: (scale) => scale,
  tileHeight: (scale) => scale / 2,
}
