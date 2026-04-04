export interface PatternParams {
  readonly color1: string
  readonly color2: string
  readonly color3?: string
  readonly scale: number
  readonly strokeWidth: number
  readonly rotation: number
  readonly opacity: number
}

export interface PatternDefinition {
  readonly id: string
  readonly generate: (params: PatternParams) => string
  readonly defaultParams: PatternParams
  readonly hasAccentColor: boolean
}
