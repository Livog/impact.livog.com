'use client'

import { RadioCard } from '@chakra-ui/react'

export function RadioCardPage() {
  return (
    <RadioCard.Root defaultValue="next">
      <RadioCard.Label>Select framework</RadioCard.Label>
      <div style={{ display: 'flex', gap: '8px' }}>
        {items.map((item) => (
          <RadioCard.Item key={item.value} value={item.value}>
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl>
              <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
              <RadioCard.ItemIndicator />
            </RadioCard.ItemControl>
          </RadioCard.Item>
        ))}
      </div>
    </RadioCard.Root>
  )
}

const items = [
  { value: 'next', title: 'Next.js' },
  { value: 'vite', title: 'Vite' },
  { value: 'astro', title: 'Astro' },
]
