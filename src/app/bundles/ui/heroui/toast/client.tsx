'use client'

import { addToast } from '@heroui/react'

export function ToastPage() {
  return (
    <button
      onClick={() => {
        addToast({ title: 'Toast Title' })
      }}
    >
      Default
    </button>
  )
}
