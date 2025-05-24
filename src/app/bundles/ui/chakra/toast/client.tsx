'use client'

import { Toast } from '@chakra-ui/react'

export function ToastPage() {
  return (
    <Toast.Root>
      <Toast.Trigger asChild>
        <button>Notify</button>
      </Toast.Trigger>
      <Toast.Positioner />
      <Toast.Title>Notification</Toast.Title>
      <Toast.Description>Your action was successful.</Toast.Description>
    </Toast.Root>
  )
}
