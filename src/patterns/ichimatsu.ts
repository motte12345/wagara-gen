import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, opacity } = params
  const half = scale / 2
  return [
    `<rect x="0" y="0" width="${half}" height="${half}" fill="${color1}" opacity="${opacity}" />`,
    `<rect x="${half}" y="${half}" width="${half}" height="${half}" fill="${color1}" opacity="${opacity}" />`,
  ].join('')
}

export const ichimatsu: PatternDefinition = {
  id: 'ichimatsu',
  generate,
  defaultParams: {
    color1: '#2d4a3e',
    color2: '#f5f0e8',
    scale: 40,
    strokeWidth: 1,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: false,
}
