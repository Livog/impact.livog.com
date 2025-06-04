'use client'

import { useForm } from 'react-hook-form'

export function ReactHookFormPage() {
  const { register, handleSubmit } = useForm<{ name: string }>({
    defaultValues: { name: '' }
  })

  return (
    <form onSubmit={handleSubmit(() => {})}>
      <input {...register('name')} placeholder="Name" />
    </form>
  )
}
