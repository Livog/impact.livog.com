'use client'

import { NavigationMenu } from '@base-ui-components/react/navigation-menu'

export function NavigationMenuPage() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Open</NavigationMenu.Trigger>
          <NavigationMenu.Content>Content</NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}
