import { describe, it, expect } from 'vitest'
import { buildPatternSvg } from './svg-builder.ts'
import { PATTERN_LIST } from '../patterns/index.ts'

describe('buildPatternSvg', () => {
  it('returns complete SVG for each pattern', () => {
    for (const pattern of PATTERN_LIST) {
      const svg = buildPatternSvg(pattern, pattern.defaultParams, 400, 400)
      expect(svg).toContain('<svg xmlns="http://www.w3.org/2000/svg"')
      expect(svg).toContain('width="400"')
      expect(svg).toContain('height="400"')
      expect(svg).toContain('<pattern id="p"')
      expect(svg).toContain('</svg>')
    }
  })

  it('includes background color rect', () => {
    const pattern = PATTERN_LIST[0]
    const svg = buildPatternSvg(pattern, pattern.defaultParams, 100, 100)
    expect(svg).toContain(`fill="${pattern.defaultParams.color2}"`)
  })

  it('includes rotation when non-zero', () => {
    const pattern = PATTERN_LIST[0]
    const params = { ...pattern.defaultParams, rotation: 90 }
    const svg = buildPatternSvg(pattern, params, 100, 100)
    expect(svg).toContain('patternTransform="rotate(90')
  })

  it('omits rotation when zero', () => {
    const pattern = PATTERN_LIST[0]
    const params = { ...pattern.defaultParams, rotation: 0 }
    const svg = buildPatternSvg(pattern, params, 100, 100)
    expect(svg).not.toContain('patternTransform')
  })
})
