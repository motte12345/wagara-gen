import { useParams } from 'react-router-dom'
import { I18nContext } from './i18n-context.ts'
import type { Lang, Translations } from './types.ts'
import { DEFAULT_LANG, isLang } from './types.ts'
import { en } from './en.ts'
import { ja } from './ja.ts'
import type { ReactNode } from 'react'

const translations: Record<Lang, Translations> = { en, ja }

export function I18nProvider({ children }: { readonly children: ReactNode }) {
  const { lang: langParam } = useParams<{ lang: string }>()
  const lang: Lang = langParam && isLang(langParam) ? langParam : DEFAULT_LANG
  const t = translations[lang]

  return (
    <I18nContext.Provider value={{ lang, t }}>
      {children}
    </I18nContext.Provider>
  )
}
