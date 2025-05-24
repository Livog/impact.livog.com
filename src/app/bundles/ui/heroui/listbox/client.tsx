'use client'

import { Listbox, ListboxItem } from '@heroui/react'

export function ListboxPage() {
  return (
    <div className="border-small rounded-small border-default-200 dark:border-default-100 w-full max-w-[260px] px-1 py-2">
      <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
        <ListboxItem key="new">New file</ListboxItem>
        <ListboxItem key="copy">Copy link</ListboxItem>
        <ListboxItem key="edit">Edit file</ListboxItem>
        <ListboxItem key="delete" className="text-danger" color="danger">
          Delete file
        </ListboxItem>
      </Listbox>
    </div>
  )
}
