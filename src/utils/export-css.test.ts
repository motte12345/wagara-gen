import { describe, it, expect } from 'vitest'
import { generateCss } from './export-css.ts'
import { PATTERN_LIST } from '../patterns/index.ts'

describe('generateCss', () => {
  it('returns valid CSS for each pattern', () => {
    for (const pattern of PATTERN_LIST) {
      const css = generateCss(pattern, pattern.defaultParams)
      expect(css).toContain('background-color:')
      expect(css).toContain('background-image: url("data:image/svg+xml,')
      expect(css).toContain('background-repeat: repeat')
      expect(css).toContain('background-size:')
    }
  })

  it('includes background-color matching color2', () => {
    const pattern = PATTERN_LIST[0]
    const css = generateCss(pattern, pattern.defaultParams)
    expect(css).toContain(`background-color: ${pattern.defaultParams.color2}`)
  })

  it('includes rotation in SVG when rotation is non-zero', () => {
    const pattern = PATTERN_LIST[0]
    const params = { ...pattern.defaultParams, rotation: 45 }
    const css = generateCss(pattern, params)
    expect(css).toContain('patternTransform')
    expect(css).toContain('rotate(45')
  })

  it('does not include rotation when rotation is 0', () => {
    const pattern = PATTERN_LIST[0]
    const params = { ...pattern.defaultParams, rotation: 0 }
    const css = generateCss(pattern, params)
    expect(css).not.toContain('patternTransform')
  })
})
