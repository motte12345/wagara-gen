import { useCallback, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { PatternParams } from '../patterns/types.ts'
import { usePersistedState } from './usePersistedState.ts'
import { isValidColor } from '../utils/sanitize-color.ts'

/** Parse PatternParams from URL search params, falling back to defaults. */
function parseUrlParams(
  search: URLSearchParams,
  defaults: PatternParams,
): PatternParams | null {
  // Only parse if at least one param key exists in URL
  if (!search.has('c1') && !search.has('c2') && !search.has('s')) {
    return null
  }

  const c1 = search.get('c1')
  const c2 = search.get('c2')
  const c3 = search.get('c3')
  const s = search.get('s')
  const sw = search.get('sw')
  const r = search.get('r')
  const o = search.get('o')

  return {
    color1: c1 && isValidColor(`#${c1}`) ? `#${c1}` : defaults.color1,
    color2: c2 && isValidColor(`#${c2}`) ? `#${c2}` : defaults.color2,
    color3: c3 && isValidColor(`#${c3}`) ? `#${c3}` : defaults.color3,
    scale: s ? clamp(Number(s), 20, 200) : defaults.scale,
    strokeWidth: sw ? clamp(Number(sw), 0.5, 5) : defaults.strokeWidth,
    rotation: r ? clamp(Number(r), 0, 135) : defaults.rotation,
    opacity: o ? clamp(Number(o), 0, 1) : defaults.opacity,
  }
}

function clamp(value: number, min: number, max: number): number {
  if (isNaN(value)) return min
  return Math.max(min, Math.min(max, value))
}

/** Encode PatternParams to URL search params. */
function toSearchString(params: PatternParams): string {
  const parts: string[] = [
    `c1=${params.color1.replace('#', '')}`,
    `c2=${params.color2.replace('#', '')}`,
    `s=${params.scale}`,
    `sw=${params.strokeWidth}`,
    `r=${params.rotation}`,
    `o=${params.opacity}`,
  ]
  if (params.color3) {
    parts.push(`c3=${params.color3.replace('#', '')}`)
  }
  return parts.join('&')
}

/**
 * Hook that syncs editor params between URL query params and localStorage.
 * URL params take priority on initial load (for sharing).
 * Changes update both localStorage and URL.
 */
export function useEditorParams(
  patternId: string,
  defaults: PatternParams,
): [PatternParams, (params: PatternParams) => void] {
  const [searchParams, setSearchParams] = useSearchParams()
  const [persisted, setPersisted] = usePersistedState<PatternParams>(
    `editor:${patternId}`,
    defaults,
  )

  // On mount, check if URL has params — if so, use them
  const initializedRef = useRef(false)
  const urlParams = parseUrlParams(searchParams, defaults)

  // Use URL params on first render if present, otherwise use persisted
  const params = !initializedRef.current && urlParams ? urlParams : persisted

  useEffect(() => {
    if (!initializedRef.current) {
      if (urlParams) {
        setPersisted(urlParams)
      }
      initializedRef.current = true
    }
  })

  const setParams = useCallback(
    (newParams: PatternParams) => {
      setPersisted(newParams)
      setSearchParams(toSearchString(newParams), { replace: true })
    },
    [setPersisted, setSearchParams],
  )

  return [params, setParams]
}
