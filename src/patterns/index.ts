import type { PatternDefinition } from './types.ts'
import { ichimatsu } from './ichimatsu.ts'
import { asanoha } from './asanoha.ts'
import { seigaiha } from './seigaiha.ts'
import { uroko } from './uroko.ts'
import { shippou } from './shippou.ts'
import { kikkou } from './kikkou.ts'
import { yagasuri } from './yagasuri.ts'
import { chidori } from './chidori.ts'
import { koushi } from './koushi.ts'
import { karakusa } from './karakusa.ts'
import { sakura } from './sakura.ts'
import { nami } from './nami.ts'

export type { PatternParams, PatternDefinition } from './types.ts'
export { getTileDimensions } from './types.ts'

export const PATTERN_LIST: readonly PatternDefinition[] = [
  ichimatsu,
  asanoha,
  seigaiha,
  uroko,
  shippou,
  kikkou,
  yagasuri,
  chidori,
  koushi,
  karakusa,
  sakura,
  nami,
]

const patternMap = new Map<string, PatternDefinition>(
  PATTERN_LIST.map((p) => [p.id, p]),
)

export function getPattern(id: string): PatternDefinition | undefined {
  return patternMap.get(id)
}
