import { createContext } from 'react'
import type { Lang, Translations } from './types.ts'
import { en } from './en.ts'

export interface I18nContextValue {
  readonly lang: Lang
  readonly t: Translations
}

export const I18nContext = createContext<I18nContextValue>({
  lang: 'en',
  t: en,
})
