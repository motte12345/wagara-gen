import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, strokeWidth, opacity } = params

  // Chidori (千鳥 / plovers): stylized birds in flight.
  // Traditional chidori are small abstract bird shapes scattered in a grid.
  // Each bird: rounded body, two swept-back crescent wings, small beak.
  // Tile: scale × scale with one bird at center and one offset at corners.

  const s = scale
  const bs = s * 0.35  // bird size

  const drawBird = (cx: number, cy: number, flip: boolean): string => {
    const dir = flip ? -1 : 1
    const parts: string[] = []

    // Body (small filled circle)
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${bs * 0.1}" fill="${color1}" />`)

    // Wings: two crescent arcs sweeping backward
    const wingSpan = bs * 0.8
    const wingY = cy - bs * 0.05 * dir

    // Left wing
    parts.push(`<path d="M ${cx},${wingY} Q ${cx - wingSpan * 0.5},${wingY - wingSpan * 0.5 * dir} ${cx - wingSpan},${wingY - wingSpan * 0.15 * dir}" fill="none" stroke="${color1}" stroke-width="${strokeWidth}" stroke-linecap="round" />`)

    // Right wing
    parts.push(`<path d="M ${cx},${wingY} Q ${cx + wingSpan * 0.5},${wingY - wingSpan * 0.5 * dir} ${cx + wingSpan},${wingY - wingSpan * 0.15 * dir}" fill="none" stroke="${color1}" stroke-width="${strokeWidth}" stroke-linecap="round" />`)

    // Tail: short line downward
    parts.push(`<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy + bs * 0.3 * dir}" stroke="${color1}" stroke-width="${strokeWidth}" stroke-linecap="round" />`)

    // Beak: tiny line forward (upward for normal, downward for flipped)
    parts.push(`<line x1="${cx}" y1="${wingY}" x2="${cx + bs * 0.12}" y2="${wingY - bs * 0.15 * dir}" stroke="${color1}" stroke-width="${strokeWidth * 0.8}" stroke-linecap="round" />`)

    return parts.join('')
  }

  return [
    `<g opacity="${opacity}">`,
    // Main bird at center
    drawBird(s * 0.5, s * 0.35, false),
    // Offset bird at bottom corners (tiling creates the scatter)
    drawBird(0, s * 0.85, true),
    drawBird(s, s * 0.85, true),
    `</g>`,
  ].join('')
}

export const chidori: PatternDefinition = {
  id: 'chidori',
  generate,
  defaultParams: {
    color1: '#1a5276',
    color2: '#f5f0e8',
    scale: 56,
    strokeWidth: 1.5,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: false,
}
