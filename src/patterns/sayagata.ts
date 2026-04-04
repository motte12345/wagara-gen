import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, strokeWidth, opacity } = params
  const s = scale
  const q = s / 4

  // Sayagata: interlocking manji (卍) pattern
  // Built from connected right-angle lines forming a continuous maze-like design.
  // The tile is a square containing one complete sayagata unit.

  const paths = [
    // Left manji unit
    // Horizontal bar
    `M 0,${q} L ${q * 2},${q}`,
    `M ${q},0 L ${q},${q * 2}`,
    // Hook top-right
    `M ${q * 2},${q} L ${q * 2},0`,
    // Hook bottom-left
    `M ${q},${q * 2} L 0,${q * 2}`,

    // Right manji unit (offset)
    `M ${q * 2},${q * 3} L ${s},${q * 3}`,
    `M ${q * 3},${q * 2} L ${q * 3},${s}`,
    // Hook top-right
    `M ${s},${q * 3} L ${s},${q * 2}`,
    // Hook bottom-left
    `M ${q * 3},${s} L ${q * 2},${s}`,

    // Connecting segments between the two units
    `M ${q * 2},0 L ${q * 2},${q}`,
    `M 0,${q * 2} L ${q},${q * 2}`,
    `M ${q * 2},${q * 2} L ${q * 2},${q * 3}`,
    `M ${q * 2},${q * 2} L ${q * 3},${q * 2}`,
    `M ${s},${q * 2} L ${s},${q * 3}`,
    `M ${q * 2},${s} L ${q * 3},${s}`,
  ]

  return `<g stroke="${color1}" stroke-width="${strokeWidth}" opacity="${opacity}" fill="none" stroke-linecap="square">${paths.map(d => `<path d="${d}" />`).join('')}</g>`
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
}
