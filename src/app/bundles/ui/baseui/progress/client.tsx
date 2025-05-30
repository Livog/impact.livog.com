'use client'

import { Progress } from '@base-ui-components/react/progress'

export function ProgressPage() {
  return (
    <Progress.Root value={50}>
      <Progress.Track>
        <Progress.Indicator />
      </Progress.Track>
    </Progress.Root>
  )
}
