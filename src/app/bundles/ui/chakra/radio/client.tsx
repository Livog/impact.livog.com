'use client'

import { RadioGroup } from '@chakra-ui/react'

export function RadioPage() {
  return (
    <RadioGroup.Root defaultValue="1">
      <div style={{ display: 'flex', gap: '12px' }}>
        {items.map((item) => (
          <RadioGroup.Item key={item.value} value={item.value}>
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
          </RadioGroup.Item>
        ))}
      </div>
    </RadioGroup.Root>
  )
}

const items = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
]
