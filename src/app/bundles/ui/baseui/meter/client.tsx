'use client'

import { Meter } from '@base-ui-components/react/meter'

export function MeterPage() {
  return (
    <Meter.Root value={50}>
      <Meter.Track>
        <Meter.Indicator />
      </Meter.Track>
    </Meter.Root>
  )
}
