'use client'

import { Menu } from '@base-ui-components/react/menu'

export function MenuPage() {
  return (
    <Menu.Root>
      <Menu.Trigger>Open Menu</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Popup>
          <Menu.Item>Item</Menu.Item>
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Root>
  )
}
