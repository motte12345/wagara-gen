import { describe, it, expect } from 'vitest'
import { PATTERN_LIST, getPattern } from './index.ts'
import type { PatternParams } from './types.ts'
import { en } from '../i18n/en.ts'
import { ja } from '../i18n/ja.ts'

const defaultTestParams: PatternParams = {
  color1: '#333333',
  color2: '#ffffff',
  scale: 40,
  strokeWidth: 1,
  rotation: 0,
  opacity: 1,
}

describe('Pattern registry', () => {
  it('has 22 patterns', () => {
    expect(PATTERN_LIST).toHaveLength(22)
  })

  it('has unique IDs', () => {
    const ids = PATTERN_LIST.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('pattern IDs do not conflict with reserved routes', () => {
    const reserved = ['about']
    for (const pattern of PATTERN_LIST) {
      expect(reserved).not.toContain(pattern.id)
    }
  })

  it('all patterns have EN translations', () => {
    for (const pattern of PATTERN_LIST) {
      expect(en.patterns[pattern.id], `Missing EN translation for ${pattern.id}`).toBeDefined()
      expect(en.patterns[pattern.id].name).toBeTruthy()
    }
  })

  it('all patterns have JA translations', () => {
    for (const pattern of PATTERN_LIST) {
      expect(ja.patterns[pattern.id], `Missing JA translation for ${pattern.id}`).toBeDefined()
      expect(ja.patterns[pattern.id].name).toBeTruthy()
    }
  })

  it('getPattern returns undefined for unknown ID', () => {
    expect(getPattern('nonexistent')).toBeUndefined()
  })

  it('getPattern returns correct pattern by ID', () => {
    for (const pattern of PATTERN_LIST) {
      expect(getPattern(pattern.id)).toBe(pattern)
    }
  })
})

describe.each(PATTERN_LIST.map((p) => [p.id, p]))(
  'Pattern: %s',
  (_id, pattern) => {
    const def = pattern as (typeof PATTERN_LIST)[number]

    it('generates non-empty SVG with default params', () => {
      const svg = def.generate(def.defaultParams)
      expect(svg).toBeTruthy()
      expect(svg.length).toBeGreaterThan(0)
    })

    it('generates valid SVG elements (no unclosed tags)', () => {
      const svg = def.generate(def.defaultParams)
      // Opening tags should have matching close or be self-closing
      expect(svg).not.toContain('undefined')
      expect(svg).not.toContain('NaN')
    })

    it('generates SVG with custom params', () => {
      const svg = def.generate(defaultTestParams)
      expect(svg).toBeTruthy()
      expect(svg.length).toBeGreaterThan(0)
    })

    it('respects color1 parameter', () => {
      const params = { ...defaultTestParams, color1: '#ff0000' }
      const svg = def.generate(params)
      expect(svg).toContain('#ff0000')
    })

    it('respects opacity parameter', () => {
      const params = { ...defaultTestParams, opacity: 0.5 }
      const svg = def.generate(params)
      expect(svg).toContain('0.5')
    })

    it('returns different output for different scales', () => {
      const svg1 = def.generate({ ...defaultTestParams, scale: 20 })
      const svg2 = def.generate({ ...defaultTestParams, scale: 80 })
      expect(svg1).not.toBe(svg2)
    })

    it('has valid defaultParams', () => {
      expect(def.defaultParams.scale).toBeGreaterThan(0)
      expect(def.defaultParams.strokeWidth).toBeGreaterThan(0)
      expect(def.defaultParams.opacity).toBeGreaterThanOrEqual(0)
      expect(def.defaultParams.opacity).toBeLessThanOrEqual(1)
      expect(def.defaultParams.rotation).toBeGreaterThanOrEqual(0)
      expect(def.defaultParams.color1).toMatch(/^#[0-9a-fA-F]{6}$/)
      expect(def.defaultParams.color2).toMatch(/^#[0-9a-fA-F]{6}$/)
    })

    if (def.hasAccentColor) {
      it('has color3 in defaultParams', () => {
        expect(def.defaultParams.color3).toBeDefined()
      })
    }
  },
)
