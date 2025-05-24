'use client'

import { Checkbox } from '@chakra-ui/react'

export function CheckboxPage() {
  return (
    <Checkbox.Root>
      <Checkbox.HiddenInput />
      <Checkbox.Control />
      <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
    </Checkbox.Root>
  )
} 