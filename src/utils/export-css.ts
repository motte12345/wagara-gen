import type { PatternDefinition, PatternParams } from '../patterns/types.ts'
import { getTileDimensions } from '../patterns/types.ts'

/**
 * Generate CSS background-image property using inline SVG.
 */
export function generateCss(
  pattern: PatternDefinition,
  params: PatternParams,
): string {
  const { rotation } = params
  const { width: tw, height: th } = getTileDimensions(pattern, params.scale)
  const patternContent = pattern.generate(params)

  const transform = rotation !== 0
    ? ` patternTransform="rotate(${rotation} ${tw / 2} ${th / 2})"`
    : ''

  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${tw}" height="${th}">`,
    `<defs>`,
    `<pattern id="p" width="${tw}" height="${th}" patternUnits="userSpaceOnUse"${transform}>`,
    patternContent,
    `</pattern>`,
    `</defs>`,
    `<rect width="100%" height="100%" fill="${params.color2}" />`,
    `<rect width="100%" height="100%" fill="url(#p)" />`,
    `</svg>`,
  ].join('')

  const encoded = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22')

  return `background-color: ${params.color2};\nbackground-image: url("data:image/svg+xml,${encoded}");\nbackground-repeat: repeat;\nbackground-size: ${tw}px ${th}px;`
}
