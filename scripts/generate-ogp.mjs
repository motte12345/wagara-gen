import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT_PATH = join(__dirname, '..', 'public', 'ogp.png')

// Ichimatsu pattern tile (used as background decoration)
const patternTile = (x, y, size, color, opacity) => {
  const half = size / 2
  return `
    <rect x="${x}" y="${y}" width="${half}" height="${half}" fill="${color}" opacity="${opacity}" />
    <rect x="${x + half}" y="${y + half}" width="${half}" height="${half}" fill="${color}" opacity="${opacity}" />
  `
}

// Generate repeating pattern background
const patternBg = () => {
  const tiles = []
  const tileSize = 40
  for (let y = 0; y < 630; y += tileSize) {
    for (let x = 0; x < 1200; x += tileSize) {
      tiles.push(patternTile(x, y, tileSize, '#ffffff', 0.06))
    }
  }
  return tiles.join('')
}

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2d4a3e" />
      <stop offset="100%" style="stop-color:#1a3028" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)" />

  <!-- Pattern decoration -->
  ${patternBg()}

  <!-- Decorative circles -->
  <circle cx="100" cy="120" r="80" fill="#d4879c" opacity="0.12" />
  <circle cx="1100" cy="500" r="100" fill="#4a90d9" opacity="0.1" />
  <circle cx="950" cy="100" r="60" fill="#e8c74a" opacity="0.1" />

  <!-- Title -->
  <text x="600" y="250" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-size="72" font-weight="700" fill="#ffffff">
    Japanese Pattern Generator
  </text>

  <!-- Accent line -->
  <rect x="450" y="280" width="300" height="3" rx="1.5" fill="#e8c74a" opacity="0.8" />

  <!-- Subtitle -->
  <text x="600" y="340" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-size="28" fill="#ffffff" opacity="0.85">
    Create &amp; Customize Traditional Wagara Patterns
  </text>

  <!-- Japanese subtitle -->
  <text x="600" y="385" text-anchor="middle" font-family="'Noto Sans JP', 'Yu Gothic', sans-serif" font-size="22" fill="#ffffff" opacity="0.6">
    和柄ジェネレーター — SVG / PNG / CSS
  </text>

  <!-- Footer bar -->
  <rect x="0" y="560" width="1200" height="70" fill="#000000" opacity="0.3" />
  <text x="600" y="604" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-size="20" fill="#ffffff" opacity="0.7">
    wagara-gen.pages.dev
  </text>
</svg>
`

const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer()
await sharp(pngBuffer).toFile(OUTPUT_PATH)
console.log('OGP image generated:', OUTPUT_PATH)
