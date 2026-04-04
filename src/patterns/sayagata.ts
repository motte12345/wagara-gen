import type { PatternDefinition, PatternParams } from './types.ts'

function generate(params: PatternParams): string {
  const { color1, scale, strokeWidth, opacity } = params

  // Sayagata (紗綾形): interlocking manji (卍) pattern forming a continuous maze.
  // The pattern consists of connected right-angle hooks.
  // Tile: scale × scale (square), divided into a 4×4 sub-grid.

  const s = scale
  const u = s / 4  // sub-grid unit

  // The sayagata is built from a specific arrangement of line segments
  // within a square tile. Two manji units interlock.

  // Path as a single continuous polyline-like structure
  const segments = [
    // Upper-left manji (卍)
    // Horizontal bar
    [0, u, u * 2, u],
    // Vertical bar
    [u, 0, u, u * 2],
    // Right hook (goes up from end of horizontal)
    [u * 2, u, u * 2, 0],
    // Bottom hook (goes left from end of vertical)
    [u, u * 2, 0, u * 2],

    // Lower-right manji (卍, rotated 180°)
    [u * 2, u * 3, u * 4, u * 3],
    [u * 3, u * 2, u * 3, u * 4],
    [u * 4, u * 3, u * 4, u * 2],
    [u * 3, u * 4, u * 2, u * 4],

    // Connecting segments between the two manji
    [u * 2, u * 2, u * 2, u * 3],
    [u * 2, u * 2, u * 3, u * 2],
  ]

  const lineEls = segments.map(
    ([x1, y1, x2, y2]) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" />`
  ).join('')

  return `<g stroke="${color1}" stroke-width="${strokeWidth}" opacity="${opacity}" fill="none" stroke-linecap="round">${lineEls}</g>`
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
