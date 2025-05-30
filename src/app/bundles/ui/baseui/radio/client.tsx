'use client'

import { Radio } from '@base-ui-components/react/radio'
import { RadioGroup } from '@base-ui-components/react/radio-group'

export function RadioPage() {
  return (
    <RadioGroup>
      <label className="flex items-center gap-1">
        <Radio.Root value="1">
          <Radio.Indicator />
        </Radio.Root>
        <span>One</span>
      </label>
      <label className="flex items-center gap-1">
        <Radio.Root value="2">
          <Radio.Indicator />
        </Radio.Root>
        <span>Two</span>
      </label>
    </RadioGroup>
  )
}
