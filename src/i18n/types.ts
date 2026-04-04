export type Lang = 'en' | 'ja'

export const DEFAULT_LANG: Lang = 'en'

export function isLang(value: string): value is Lang {
  return value === 'en' || value === 'ja'
}

export interface Translations {
  common: {
    siteTitle: string
    siteDescription: string
    nav: {
      home: string
      about: string
    }
    footer: {
      about: string
      copyright: string
    }
    langSwitch: string
  }
  home: {
    heading: string
    subheading: string
  }
  editor: {
    color1: string
    color2: string
    color3: string
    scale: string
    strokeWidth: string
    rotation: string
    opacity: string
    download: string
    downloadSvg: string
    downloadPng: string
    copyCss: string
    copySvg: string
    copied: string
    preview: string
    pngSize: string
    reset: string
  }
  about: {
    heading: string
    content: string
  }
  culture: {
    origin: string
    history: string
    symbolism: string
    modernUse: string
  }
  patterns: Record<string, {
    name: string
    description: string
    origin: string
    history: string
    symbolism: string
    modernUse: string
  }>
}
