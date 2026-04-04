import { useContext } from 'react'
import { I18nContext } from './i18n-context.ts'
import type { Lang, Translations } from './types.ts'

export function useLang(): Lang {
  return useContext(I18nContext).lang
}

export function useT(): Translations {
  return useContext(I18nContext).t
}

export function langPath(lang: Lang, path: string): string {
  return `/${lang}${path}`
}
