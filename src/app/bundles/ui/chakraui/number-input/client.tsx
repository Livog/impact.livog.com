'use client'

import { NumberInput } from '@chakra-ui/react'

export function NumberInputPage() {
  return (
    <NumberInput.Root defaultValue="10" width="200px">
      <NumberInput.Control />
      <NumberInput.Input />
    </NumberInput.Root>
  )
}
