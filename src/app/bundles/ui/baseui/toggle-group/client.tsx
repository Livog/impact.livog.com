'use client'

import { Toggle } from '@base-ui-components/react/toggle'
import { ToggleGroup } from '@base-ui-components/react/toggle-group'

export function ToggleGroupPage() {
  return (
    <ToggleGroup>
      <Toggle value="a">A</Toggle>
      <Toggle value="b">B</Toggle>
    </ToggleGroup>
  )
}
