'use client'

import { Field } from '@chakra-ui/react'

export function FieldPage() {
  return (
    <Field.Root>
      <Field.Label>Email</Field.Label>
      <input placeholder="me@example.com" />
    </Field.Root>
  )
}
