'use client'

import { Field } from '@base-ui-components/react/field'

export function FieldPage() {
  return (
    <Field.Root>
      <Field.Label>Name</Field.Label>
      <Field.Control
        required
        placeholder="Required"
      />
      <Field.Error match="valueMissing">
        Please enter your name
      </Field.Error>

      <Field.Description>
        Visible on your profile
      </Field.Description>
    </Field.Root>
  )
}
