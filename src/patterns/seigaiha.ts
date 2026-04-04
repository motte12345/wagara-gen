import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, color3, scale, strokeWidth, opacity } = params
  const r = scale / 2
  // Seigaiha: concentric arcs arranged in a wave pattern
  // Each unit is a set of concentric semicircles
  const arcs: string[] = []
  const rings = 4
  const accent = color3 ?? color1

  for (let i = rings; i >= 1; i--) {
    const ri = (r * i) / rings
    const col = i === 2 ? accent : color1
    arcs.push(
      `<circle cx="${r}" cy="${r}" r="${ri}" fill="none" stroke="${col}" stroke-width="${strokeWidth}" />`
    )
  }

  // Clip to top half of the circle
  const group = arcs.join('')

  // Two offset positions to create the wave overlap
  return [
    `<defs><clipPath id="seigaiha-clip"><rect x="0" y="0" width="${scale}" height="${r}" /></clipPath></defs>`,
    `<g clip-path="url(#seigaiha-clip)" opacity="${opacity}">`,
    `<g transform="translate(0,0)">${group}</g>`,
    `</g>`,
    `<g clip-path="url(#seigaiha-clip)" opacity="${opacity}">`,
    `<g transform="translate(${r},${r})">${group}</g>`,
    `</g>`,
  ].join('')
}

export const seigaiha: PatternDefinition = {
  id: 'seigaiha',
  generate,
  defaultParams: {
    color1: '#2b5797',
    color2: '#f5f0e8',
    color3: '#4a90d9',
    scale: 60,
    strokeWidth: 1,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: true,
}
