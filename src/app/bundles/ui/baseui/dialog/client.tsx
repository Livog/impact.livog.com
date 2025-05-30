'use client'

import { Dialog } from '@base-ui-components/react/dialog'
import { useState } from 'react'

export function DialogPage() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Popup>
            <Dialog.Title>Title</Dialog.Title>
            <Dialog.Description>Dialog content</Dialog.Description>
            <button onClick={() => setOpen(false)}>Close</button>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
