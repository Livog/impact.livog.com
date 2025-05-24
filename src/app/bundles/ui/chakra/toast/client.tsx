'use client'

import { toaster } from './toaster'

export function ToastPage() {
  return (
    <button
      onClick={() =>
        toaster.create({
          title: 'Hello, world!',
          description: 'This is a notification',
          action: {
            label: 'Close',
            onClick: () => toaster.dismiss()
          }
        })
      }>
      Notify
    </button>
  )
}
