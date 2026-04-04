import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, strokeWidth, opacity } = params
  const s = scale

  // Karakusa: arabesque vine scroll pattern
  // S-shaped curves with small spiral tendrils
  const r = s * 0.3
  const cy = s / 2

  return [
    `<g stroke="${color1}" stroke-width="${strokeWidth}" fill="none" opacity="${opacity}" stroke-linecap="round">`,
    // Main S-curve vine
    `<path d="M 0,${cy} C ${s * 0.25},${cy - r} ${s * 0.25},${cy - r} ${s / 2},${cy} S ${s * 0.75},${cy + r} ${s},${cy}" />`,
    // Upper tendril spiral
    `<path d="M ${s * 0.25},${cy - r * 0.5} Q ${s * 0.15},${cy - r * 1.2} ${s * 0.35},${cy - r * 1.1}" />`,
    // Small leaf at top
    `<path d="M ${s * 0.35},${cy - r * 1.1} Q ${s * 0.45},${cy - r * 0.7} ${s * 0.3},${cy - r * 0.6}" />`,
    // Lower tendril spiral
    `<path d="M ${s * 0.75},${cy + r * 0.5} Q ${s * 0.85},${cy + r * 1.2} ${s * 0.65},${cy + r * 1.1}" />`,
    // Small leaf at bottom
    `<path d="M ${s * 0.65},${cy + r * 1.1} Q ${s * 0.55},${cy + r * 0.7} ${s * 0.7},${cy + r * 0.6}" />`,
    `</g>`,
  ].join('')
}

export const karakusa: PatternDefinition = {
  id: 'karakusa',
  generate,
  defaultParams: {
    color1: '#2d6b4e',
    color2: '#f5f0e8',
    scale: 64,
    strokeWidth: 1.5,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: false,
}
