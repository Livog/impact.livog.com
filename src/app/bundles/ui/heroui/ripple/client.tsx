'use client'

import { Ripple } from '@heroui/react'

export function RipplePage() {
  return (
    <Ripple as="button" ripples={[]} onClear={() => {}}>
      Click me
    </Ripple>
  )
}
