import { useMemo } from 'react'
import type { PatternDefinition, PatternParams } from '../patterns/types.ts'
import { getTileDimensions } from '../patterns/types.ts'

interface PatternPreviewProps {
  readonly pattern: PatternDefinition
  readonly params: PatternParams
  readonly size?: number
}

export function PatternPreview({ pattern, params, size = 400 }: PatternPreviewProps) {
  const { rotation } = params
  const { width: tw, height: th } = getTileDimensions(pattern, params.scale)

  const patternContent = useMemo(
    () => pattern.generate(params),
    [pattern, params],
  )

  const transform = rotation !== 0
    ? `rotate(${rotation} ${tw / 2} ${th / 2})`
    : undefined

  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className="pattern-preview"
      role="img"
      aria-label={`${pattern.id} pattern preview`}
    >
      <defs>
        <pattern
          id={`preview-${pattern.id}`}
          width={tw}
          height={th}
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
