'use client'

import { Collapsible } from '@base-ui-components/react/collapsible'

export function CollapsiblePage() {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger>Toggle</Collapsible.Trigger>
      <Collapsible.Panel>Hidden content</Collapsible.Panel>
    </Collapsible.Root>
  )
}
