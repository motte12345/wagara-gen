import { useT } from '../i18n/index.ts'
import { PageHead } from '../components/PageHead.tsx'

export function AboutPage() {
  const t = useT()

  return (
    <div className="about-page">
      <PageHead
        title={`${t.about.heading} | ${t.common.siteTitle}`}
        description={t.about.content}
        path="/about"
      />
      <h1>{t.about.heading}</h1>
      <p>{t.about.content}</p>
    </div>
  )
}
