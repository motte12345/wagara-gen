import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, strokeWidth, opacity } = params
  const w = scale
  const h = scale
  const waveH = h * 0.3

  // Nami: dynamic wave pattern with multiple flowing lines
  const lines: string[] = []
  const waveCount = 3

  for (let i = 0; i < waveCount; i++) {
    const y = h * (0.2 + i * 0.3)
    const amp = waveH * (1 - i * 0.2)
    lines.push(
      `<path d="M 0,${y} Q ${w * 0.25},${y - amp} ${w * 0.5},${y} Q ${w * 0.75},${y + amp} ${w},${y}" />`
    )
  }

  return [
    `<g stroke="${color1}" stroke-width="${strokeWidth}" fill="none" opacity="${opacity}" stroke-linecap="round">`,
    ...lines,
    `</g>`,
  ].join('')
}

export const nami: PatternDefinition = {
  id: 'nami',
  generate,
  defaultParams: {
    color1: '#2b5797',
    color2: '#f5f0e8',
    scale: 64,
    strokeWidth: 1.5,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: false,
  usesStroke: true,
}
