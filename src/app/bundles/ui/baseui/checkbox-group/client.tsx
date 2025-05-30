'use client'

import { CheckboxGroup } from '@base-ui-components/react/checkbox-group'
import { Checkbox } from '@base-ui-components/react/checkbox'

export function CheckboxGroupPage() {
  return (
    <CheckboxGroup>
      <label className="flex items-center gap-2">
        <Checkbox.Root value="a">
          <Checkbox.Indicator />
        </Checkbox.Root>
        <span>A</span>
      </label>
      <label className="flex items-center gap-2">
        <Checkbox.Root value="b">
          <Checkbox.Indicator />
        </Checkbox.Root>
        <span>B</span>
      </label>
    </CheckboxGroup>
  )
}
