'use client'

import { Field } from '@base-ui-components/react/field'
import { Input } from '@base-ui-components/react/input'

export function InputPage() {
  return (
    <Field.Root>
      <Field.Label>Email</Field.Label>
      <Input />
    </Field.Root>
  )
}
