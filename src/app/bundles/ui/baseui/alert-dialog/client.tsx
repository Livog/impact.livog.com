'use client'

import { AlertDialog } from '@base-ui-components/react/alert-dialog'

export function AlertDialogPage() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>Open Alert</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop />
        <AlertDialog.Popup>
          <AlertDialog.Title>Alert</AlertDialog.Title>
          <AlertDialog.Description>Alert dialog content</AlertDialog.Description>
          <div className="flex gap-2">
            <AlertDialog.Close>Close</AlertDialog.Close>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
