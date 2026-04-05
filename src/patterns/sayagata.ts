import type { PatternDefinition, PatternParams } from './types.ts'

// All path data combined from 128×128 reference SVG
const PATH_D = [
  // Upper-left group
  'M47.77,5.11L52.88,0h-8.53l-5.11,5.11l12.8,12.8l-8.53,8.53L17.06,0H8.54l34.97,34.97l17.06-17.06L47.77,5.11z',
  'M69.95,0l-0.84,0.84L68.27,0h-8.53l9.37,9.37L78.48,0H69.95z',
  'M93.86,0h-8.52l5.1,5.11L5.11,90.44L0,85.34v8.52l5.11,5.11L98.97,5.11L93.86,0z',
  'M0,8.54v8.52l26.44,26.45l-8.53,8.53l-12.8-12.8L0,44.35v8.53l5.11-5.11l12.8,12.8l17.06-17.06L0,8.54z',
  'M0,59.74v8.53l0.84,0.84L0,69.95v8.53l9.37-9.37L0,59.74z',
  // Center / lower-right group
  'M94.71,52.04L77.64,69.11L128,119.46v-8.52L86.17,69.11l8.54-8.54l12.8,12.8l12.8-12.79l4.26-4.27',
  'l-12.8-12.8l12.8-12.8l-17.06-17.07l-93.87,93.87l17.07,17.06l12.8-12.8l8.54,8.54l4.26,4.26l4.27-4.26',
  'l12.79-12.8l-12.8-12.8l8.54-8.54L110.94,128h8.52L69.11,77.64L52.04,94.71l12.8,12.8l-8.53,8.53',
  'l-12.8-12.8l-12.8,12.8l-8.54-8.53l85.34-85.34l8.53,8.54l-12.8,12.8l12.8,12.8l-8.53,8.53L94.71,52.04z',
  // Right edge group
  'M128,44.35l-7.69,7.7l-4.27,4.26l4.27,4.27l7.69,7.69v-8.53l-3.43-3.43l3.43-3.43V44.35z',
  'M119.46,0h-8.52L128,17.07V8.54L119.46,0z',
  'M128,69.95l-11.96,11.96L128,93.86v-8.52l-3.43-3.43l3.43-3.43V69.95z',
  // Bottom edge group
  'M81.91,116.04L69.95,128h8.53l3.43-3.43l3.43,3.43h8.52L81.91,116.04z',
  'M56.31,116.04l-4.26,4.27l-7.7,7.69h8.53l3.43-3.43l3.43,3.43h8.53L56.31,116.04z',
  'M0,110.94v8.52L8.54,128h8.53L0,110.94z',
].join('')

function generate(params: PatternParams): string {
  const { color1, scale, opacity } = params

  // Sayagata (紗綾形): interlocking manji maze pattern
  // Base tile: 128×128, scaled via transform
  const s = scale / 128

  return `<g transform="scale(${s})" opacity="${opacity}"><path d="${PATH_D}" fill="${color1}" /></g>`
}

export const sayagata: PatternDefinition = {
  id: 'sayagata',
  category: 'geometric',
  generate,
  defaultParams: {
    color1: '#ffffff',
    color2: '#50bba9',
    scale: 64,
    strokeWidth: 1,
    rotation: 0,
    opacity: 1,
  },
  hasAccentColor: false,
}
