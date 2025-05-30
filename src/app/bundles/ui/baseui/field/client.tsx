'use client'

import { Field } from '@base-ui-components/react/field'

export function FieldPage() {
  return (
    <Field.Root>
      <Field.Label>Name</Field.Label>
      <Field.Control render="input" />
    </Field.Root>
  )
}
