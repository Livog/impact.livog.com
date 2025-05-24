'use client'

import React from 'react'
import { Form } from '@heroui/react'

export function FormPage() {
  const [submitted, setSubmitted] = React.useState<Record<string, FormDataEntryValue> | null>(null)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    setSubmitted(data)
  }

  return (
    <Form className="w-full max-w-xs" onSubmit={onSubmit}>
      <input name="email" placeholder="Enter your email" type="email" />
      <button type="submit">Submit</button>
      {submitted && (
        <div className="text-small text-default-500">
          You submitted: <code>{JSON.stringify(submitted)}</code>
        </div>
      )}
    </Form>
  )
}
