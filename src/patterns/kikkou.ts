import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, strokeWidth, opacity } = params
  // Kikkou: regular hexagonal tiling (tortoiseshell)
  // Pattern tile covers one hexagon + offset
  const w = scale
  const h = scale * Math.sqrt(3) / 2
  const hw = w / 2
  const qw = w / 4

  // Top hexagon (centered at hw, h/2)
  const hex1 = [
    `${qw},0`,
    `${qw + hw},0`,
    `${w},${h / 2}`,
    `${qw + hw},${h}`,
    `${qw},${h}`,
    `0,${h / 2}`,
  ].join(' ')

  return [
    `<g stroke="${color1}" stroke-width="${strokeWidth}" fill="none" opacity="${opacity}">`,
    `<polygon points="${hex1}" />`,
    `</g>`,
  ].join('')
}

export const kikkou: PatternDefinition = {
  id: 'kikkou',
  generate,
  defaultParams: {
    color1: '#2d6b4e',
    color2: '#f5f0e8',
    scale: 48,
    strokeWidth: 1.5,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: false,
}
