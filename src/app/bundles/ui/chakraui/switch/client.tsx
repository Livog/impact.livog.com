'use client'

import { Switch } from '@chakra-ui/react'

export function SwitchPage() {
  return (
    <Switch.Root>
      <Switch.HiddenInput />
      <Switch.Control />
      <Switch.Label>Activate Chakra</Switch.Label>
    </Switch.Root>
  )
} 