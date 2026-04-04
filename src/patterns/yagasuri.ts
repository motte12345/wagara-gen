import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, opacity } = params
  const w = scale
  const h = scale

  // Yagasuri: arrow feather pattern — chevron shapes pointing alternately
  // Left half: arrow pointing up
  return [
    // Upper-left arrow (pointing right)
    `<polygon points="0,0 ${w / 2},${h / 4} 0,${h / 2}" fill="${color1}" opacity="${opacity}" />`,
    // Lower-left arrow (pointing right)
    `<polygon points="0,${h / 2} ${w / 2},${h * 3 / 4} 0,${h}" fill="${color1}" opacity="${opacity}" />`,
    // Upper-right arrow (pointing left)
    `<polygon points="${w},0 ${w / 2},${h / 4} ${w},${h / 2}" fill="${color1}" opacity="${opacity}" />`,
    // Lower-right arrow (pointing left)
    `<polygon points="${w},${h / 2} ${w / 2},${h * 3 / 4} ${w},${h}" fill="${color1}" opacity="${opacity}" />`,
  ].join('')
}

export const yagasuri: PatternDefinition = {
  id: 'yagasuri',
  generate,
  defaultParams: {
    color1: '#8b2252',
    color2: '#f5f0e8',
    scale: 40,
    strokeWidth: 1,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: false,
}
