import type { PatternDefinition, PatternParams } from '../patterns/types.ts'

interface PatternPreviewProps {
  readonly pattern: PatternDefinition
  readonly params: PatternParams
  readonly size?: number
}

export function PatternPreview({ pattern, params, size = 400 }: PatternPreviewProps) {
  const { scale, rotation } = params
  const patternContent = pattern.generate(params)

  const transform = rotation !== 0
    ? `rotate(${rotation} ${scale / 2} ${scale / 2})`
    : undefined

  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className="pattern-preview"
    >
      <defs>
        <pattern
          id={`preview-${pattern.id}`}
          width={scale}
          height={scale}
          patternUnits="userSpaceOnUse"
          patternTransform={transform}
        >
          <g dangerouslySetInnerHTML={{ __html: patternContent }} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={params.color2} />
      <rect width="100%" height="100%" fill={`url(#preview-${pattern.id})`} />
    </svg>
  )
}
