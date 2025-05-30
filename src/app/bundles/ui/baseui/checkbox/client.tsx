'use client'

import { Checkbox } from '@base-ui-components/react/checkbox'

export function CheckboxPage() {
  return (
    <label className="flex items-center gap-2">
      <Checkbox.Root>
        <Checkbox.Indicator />
      </Checkbox.Root>
      <span>Check me</span>
    </label>
  )
}
