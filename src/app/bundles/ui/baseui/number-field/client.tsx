'use client'

import { NumberField } from '@base-ui-components/react/number-field'

export function NumberFieldPage() {
  return (
    <NumberField.Root>
      <NumberField.Group>
        <NumberField.Decrement>-</NumberField.Decrement>
        <NumberField.Input />
        <NumberField.Increment>+</NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  )
}
