'use client'

import { Dialog, DialogTrigger, DialogContent } from '@/components/livogui/dialog'

export function DialogPage() {
  return (
    <Dialog>
      <DialogTrigger>Open Dialog</DialogTrigger>
      <DialogContent>Dialog content</DialogContent>
    </Dialog>
  )
}
