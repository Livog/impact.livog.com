'use client'

import { Tabs } from '@base-ui-components/react/tabs'

export function TabsPage() {
  return (
    <Tabs.Root defaultValue="tab1">
      <Tabs.List>
        <Tabs.Tab value="tab1">One</Tabs.Tab>
        <Tabs.Tab value="tab2">Two</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="tab1">Panel 1</Tabs.Panel>
      <Tabs.Panel value="tab2">Panel 2</Tabs.Panel>
    </Tabs.Root>
  )
}
