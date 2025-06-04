'use client'

import { useForm } from '@tanstack/react-form'

export function TanstackFormPage() {
  const form = useForm({
    defaultValues: { name: '' },
    onSubmit: () => {}
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <form.Field name="name">
        {(field) => (
          <input
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            placeholder="Name"
          />
        )}
      </form.Field>
    </form>
  )
}
