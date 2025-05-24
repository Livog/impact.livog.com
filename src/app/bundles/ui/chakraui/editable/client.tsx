'use client'

import { Editable } from '@chakra-ui/react'

export function EditablePage() {
  return (
    <Editable.Root textAlign="start" defaultValue="Click to edit">
      <Editable.Preview />
      <Editable.Input />
    </Editable.Root>
  )
}
