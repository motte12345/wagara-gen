// Generate sitemap.xml from pattern list
// Usage: node scripts/generate-sitemap.mjs

import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SITE_URL = 'https://wagara.simtool.dev'
const LANGS = ['en', 'ja']

const PATTERNS = [
  'ichimatsu', 'asanoha', 'seigaiha', 'uroko', 'shippou', 'kikkou',
  'yagasuri', 'chidori', 'koushi', 'sayagata', 'kagome', 'tatewaku',
  'sakura', 'nami', 'fundou', 'kouji', 'juuji', 'matsukawa',
  'hishiseigaiha', 'chidoritsunagi', 'nawame', 'kazaguruma',
]

function urlEntry(path, priority, changefreq = 'monthly') {
  const alternates = LANGS.map(
    (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}/${l}${path}" />`
  ).join('\n')

  return LANGS.map((lang) => `  <url>
    <loc>${SITE_URL}/${lang}${path}</loc>
${alternates}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')
}

const entries = [
  urlEntry('/', '1.0', 'weekly'),
  ...PATTERNS.flatMap((id) => [
    urlEntry(`/${id}`, '0.8'),
    urlEntry(`/${id}/culture`, '0.6'),
  ]),
  urlEntry('/about', '0.3'),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`

const outPath = resolve(__dirname, '..', 'public', 'sitemap.xml')
writeFileSync(outPath, xml)
const totalUrls = LANGS.length * (1 + PATTERNS.length * 2 + 1)
console.log(`Generated sitemap.xml with ${totalUrls} URLs`)
