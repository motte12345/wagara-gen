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
  /** Whether strokeWidth parameter affects this pattern's rendering. Defaults to false. */
  readonly usesStroke?: boolean
  /** Tile width as a function of scale. Defaults to scale if omitted. */
  readonly tileWidth?: (scale: number) => number
  /** Tile height as a function of scale. Defaults to scale if omitted. */
  readonly tileHeight?: (scale: number) => number
}

/** Get the actual tile dimensions for a pattern at a given scale. */
export function getTileDimensions(
  pattern: PatternDefinition,
  scale: number,
): { width: number; height: number } {
  return {
    width: pattern.tileWidth ? pattern.tileWidth(scale) : scale,
    height: pattern.tileHeight ? pattern.tileHeight(scale) : scale,
  }
}
