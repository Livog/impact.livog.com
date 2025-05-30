'use client'

import { ContextMenu } from '@base-ui-components/react/context-menu'

export function ContextMenuPage() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>Right click</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Backdrop />
        <ContextMenu.Positioner>
          <ContextMenu.Popup>
            <ContextMenu.Item>Item One</ContextMenu.Item>
          </ContextMenu.Popup>
        </ContextMenu.Positioner>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}
