import { Helmet } from 'react-helmet-async'
import { useLang } from '../i18n/index.ts'

interface PageHeadProps {
  readonly title: string
  readonly description: string
  readonly path: string
}

const SITE_URL = 'https://wagara-gen.pages.dev'

export function PageHead({ title, description, path }: PageHeadProps) {
  const lang = useLang()
  const url = `${SITE_URL}/${lang}${path}`
  const otherLang = lang === 'ja' ? 'en' : 'ja'
  const otherUrl = `${SITE_URL}/${otherLang}${path}`

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang={lang} href={url} />
      <link rel="alternate" hrefLang={otherLang} href={otherUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${SITE_URL}/ogp.png`} />
    </Helmet>
  )
}
