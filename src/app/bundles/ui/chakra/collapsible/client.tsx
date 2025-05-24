'use client'

import { Collapsible } from '@chakra-ui/react'

export function CollapsiblePage() {
  return (
    <Collapsible.Root unmountOnExit>
      <Collapsible.Trigger style={{ paddingBlock: '12px' }}>
        Toggle Collapse (Unmount on exit)
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div style={{ padding: '16px', border: '1px solid' }}>
          If you inspect the DOM, you&apos;ll notice that the content is unmounted
          when collapsed. This is useful for performance reasons when you have a
          lot of collapsible content.
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
