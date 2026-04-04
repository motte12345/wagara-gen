import { useState, useEffect, useCallback } from 'react'

export function usePersistedState<T>(
  key: string,
  defaultValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const prefixedKey = `wagara-gen:${key}`

  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(prefixedKey)
      return stored !== null ? (JSON.parse(stored) as T) : defaultValue
    } catch {
      return defaultValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(prefixedKey, JSON.stringify(value))
    } catch {
      // localStorage full or unavailable
    }
  }, [prefixedKey, value])

  return [value, useCallback((newValue: T | ((prev: T) => T)) => setValue(newValue), [])]
}
