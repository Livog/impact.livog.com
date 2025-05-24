'use client'

import { Tooltip } from '@chakra-ui/react'

export function TooltipPage() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button style={{ border: '1px solid', padding: '4px 8px' }}>Hover me</button>
      </Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content>
          This is the tooltip content
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  )
}
