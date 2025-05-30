'use client'

import { Toast, useToastManager } from '@base-ui-components/react/toast'

export function ToastPage() {
  const { add } = useToastManager()
  return (
    <Toast.Provider>
      <button onClick={() => add({ title: 'Toast', description: 'Hello' })}>Show Toast</button>
      <Toast.Viewport />
    </Toast.Provider>
  )
}
