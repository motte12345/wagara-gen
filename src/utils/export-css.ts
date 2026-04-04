import type { PatternDefinition, PatternParams } from '../patterns/types.ts'

/**
 * Generate CSS background-image property using inline SVG.
 */
export function generateCss(
  pattern: PatternDefinition,
  params: PatternParams,
): string {
  const { scale, rotation } = params
  const patternContent = pattern.generate(params)

  const transform = rotation !== 0
    ? ` patternTransform="rotate(${rotation} ${scale / 2} ${scale / 2})"`
    : ''

  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${scale}" height="${scale}">`,
    `<defs>`,
    `<pattern id="p" width="${scale}" height="${scale}" patternUnits="userSpaceOnUse"${transform}>`,
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

  return `background-color: ${params.color2};\nbackground-image: url("data:image/svg+xml,${encoded}");\nbackground-repeat: repeat;\nbackground-size: ${scale}px ${scale}px;`
}
