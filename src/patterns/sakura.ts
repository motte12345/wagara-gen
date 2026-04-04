import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, color3, scale, strokeWidth, opacity } = params
  const s = scale
  const cx = s / 2
  const cy = s / 2
  const r = s * 0.35
  const accent = color3 ?? color1

  // Sakura: five-petal cherry blossom
  // Each petal is a heart-like shape using cubic bezier
  const petals: string[] = []
  for (let i = 0; i < 5; i++) {
    const angle = (i * 72 - 90) * (Math.PI / 180)
    const tipX = cx + r * Math.cos(angle)
    const tipY = cy + r * Math.sin(angle)

    const leftAngle = angle - 0.35
    const rightAngle = angle + 0.35
    const ctrlR = r * 0.55

    const cl1X = cx + ctrlR * Math.cos(leftAngle)
    const cl1Y = cy + ctrlR * Math.sin(leftAngle)
    const cr1X = cx + ctrlR * Math.cos(rightAngle)
    const cr1Y = cy + ctrlR * Math.sin(rightAngle)

    petals.push(
      `<path d="M ${cx},${cy} Q ${cl1X},${cl1Y} ${tipX},${tipY} Q ${cr1X},${cr1Y} ${cx},${cy}" fill="${color1}" stroke="${color1}" stroke-width="${strokeWidth * 0.5}" />`
    )
  }

  // Center circle
  const center = `<circle cx="${cx}" cy="${cy}" r="${r * 0.15}" fill="${accent}" />`

  return `<g opacity="${opacity}">${petals.join('')}${center}</g>`
}

export const sakura: PatternDefinition = {
  id: 'sakura',
  generate,
  defaultParams: {
    color1: '#d4879c',
    color2: '#f5f0e8',
    color3: '#e8c74a',
    scale: 48,
    strokeWidth: 1,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: true,
}
