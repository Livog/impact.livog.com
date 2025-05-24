'use client'

import { Separator } from '@chakra-ui/react'

export function SeparatorPage() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span>Item 1</span>
      <Separator orientation="vertical" height="8" />
      <span>Item 2</span>
    </div>
  )
}
