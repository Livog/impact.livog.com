'use client'

import { Select } from '@base-ui-components/react/select'

export function SelectPage() {
  return (
    <Select.Root>
      <Select.Trigger>
        <Select.Value placeholder="Select an option" />
      </Select.Trigger>
      <Select.Portal>
        <Select.Backdrop />
        <Select.Positioner>
          <Select.Popup>
            <Select.Item value="1">
              <Select.ItemText>One</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
            <Select.Item value="2">
              <Select.ItemText>Two</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  )
}
