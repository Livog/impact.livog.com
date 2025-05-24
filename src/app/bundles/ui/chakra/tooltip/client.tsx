'use client'

import { Tooltip } from '@chakra-ui/react'

export function TooltipPage() {
  return (
    <Tooltip content="This is the tooltip content">
      <button style={{ border: '1px solid', padding: '4px 8px' }}>Hover me</button>
    </Tooltip>
  )
}
