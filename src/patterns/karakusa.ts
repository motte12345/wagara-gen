import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, strokeWidth, opacity } = params
  const s = scale

  // Karakusa: continuous vine scroll with spiraling tendrils
  // The main vine is an S-curve that tiles seamlessly left-to-right.
  // From each curve, spiraling tendrils curl inward.

  const cy = s / 2

  // Main S-curve vine (seamless at tile boundaries)
  const mainVine = `M 0,${cy} C ${s * 0.2},${cy - s * 0.4} ${s * 0.3},${cy - s * 0.4} ${s * 0.5},${cy} C ${s * 0.7},${cy + s * 0.4} ${s * 0.8},${cy + s * 0.4} ${s},${cy}`

  // Upper spiral tendril (curling clockwise from the upper peak of the S-curve)
  const spiralUp = [
    // Stem branching upward from the vine
    `M ${s * 0.25},${cy - s * 0.3} Q ${s * 0.2},${cy - s * 0.45} ${s * 0.28},${cy - s * 0.48}`,
    // Spiral curl inward
    `Q ${s * 0.38},${cy - s * 0.5} ${s * 0.38},${cy - s * 0.42}`,
    `Q ${s * 0.38},${cy - s * 0.35} ${s * 0.32},${cy - s * 0.35}`,
    `Q ${s * 0.27},${cy - s * 0.35} ${s * 0.29},${cy - s * 0.4}`,
  ].join(' ')

  // Lower spiral tendril (curling counter-clockwise from the lower trough)
  const spiralDown = [
    `M ${s * 0.75},${cy + s * 0.3} Q ${s * 0.8},${cy + s * 0.45} ${s * 0.72},${cy + s * 0.48}`,
    `Q ${s * 0.62},${cy + s * 0.5} ${s * 0.62},${cy + s * 0.42}`,
    `Q ${s * 0.62},${cy + s * 0.35} ${s * 0.68},${cy + s * 0.35}`,
    `Q ${s * 0.73},${cy + s * 0.35} ${s * 0.71},${cy + s * 0.4}`,
  ].join(' ')

  // Small secondary curls for density
  const smallCurlUp = `M ${s * 0.15},${cy - s * 0.18} Q ${s * 0.08},${cy - s * 0.32} ${s * 0.15},${cy - s * 0.35} Q ${s * 0.22},${cy - s * 0.32} ${s * 0.18},${cy - s * 0.25}`

  const smallCurlDown = `M ${s * 0.85},${cy + s * 0.18} Q ${s * 0.92},${cy + s * 0.32} ${s * 0.85},${cy + s * 0.35} Q ${s * 0.78},${cy + s * 0.32} ${s * 0.82},${cy + s * 0.25}`

  // Additional vine offshoot curls at left and right edges (for seamless tiling)
  const edgeCurlLeft = `M ${s * 0.05},${cy + s * 0.05} Q ${s * -0.05},${cy + s * 0.15} ${s * 0.02},${cy + s * 0.2} Q ${s * 0.1},${cy + s * 0.18} ${s * 0.07},${cy + s * 0.1}`

  const edgeCurlRight = `M ${s * 0.95},${cy - s * 0.05} Q ${s * 1.05},${cy - s * 0.15} ${s * 0.98},${cy - s * 0.2} Q ${s * 0.9},${cy - s * 0.18} ${s * 0.93},${cy - s * 0.1}`

  return [
    `<g stroke="${color1}" stroke-width="${strokeWidth}" fill="none" opacity="${opacity}" stroke-linecap="round" stroke-linejoin="round">`,
    `<path d="${mainVine}" />`,
    `<path d="${spiralUp}" />`,
    `<path d="${spiralDown}" />`,
    `<path d="${smallCurlUp}" />`,
    `<path d="${smallCurlDown}" />`,
    `<path d="${edgeCurlLeft}" />`,
    `<path d="${edgeCurlRight}" />`,
    `</g>`,
  ].join('')
}

export const karakusa: PatternDefinition = {
  id: 'karakusa',
  generate,
  defaultParams: {
    color1: '#2d6b4e',
    color2: '#f5f0e8',
    scale: 80,
    strokeWidth: 2,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: false,
  usesStroke: true,
}
