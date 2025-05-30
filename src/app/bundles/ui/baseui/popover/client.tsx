'use client'

import { Popover } from '@base-ui-components/react/popover'

export function PopoverPage() {
  return (
    <Popover.Root>
      <Popover.Trigger>Open Popover</Popover.Trigger>
      <Popover.Portal>
        <Popover.Backdrop />
        <Popover.Positioner>
          <Popover.Popup>
            <Popover.Title>Title</Popover.Title>
            <Popover.Description>Popover content</Popover.Description>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}
