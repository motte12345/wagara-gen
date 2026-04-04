import type { PatternDefinition, PatternParams } from '../patterns/types.ts'
import { getTileDimensions } from '../patterns/types.ts'

/**
 * Build a complete SVG string with tiled pattern.
 */
export function buildPatternSvg(
  pattern: PatternDefinition,
  params: PatternParams,
  width: number,
  height: number,
): string {
  const { rotation } = params
  const { width: tw, height: th } = getTileDimensions(pattern, params.scale)
  const patternContent = pattern.generate(params)

  const transform = rotation !== 0
    ? ` patternTransform="rotate(${rotation} ${tw / 2} ${th / 2})"`
    : ''

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`,
    `<defs>`,
    `<pattern id="p" width="${tw}" height="${th}" patternUnits="userSpaceOnUse"${transform}>`,
    patternContent,
    `</pattern>`,
    `</defs>`,
    `<rect width="100%" height="100%" fill="${params.color2}" />`,
    `<rect width="100%" height="100%" fill="url(#p)" />`,
    `</svg>`,
  ].join('')
}
