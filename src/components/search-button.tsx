'use client'

import { useState } from 'react'
import { SearchIcon } from 'lucide-react'
import { CommandShortcut } from '@/components/ui/command'
import { SearchDialog } from './search-dialog'

export function SearchButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`bg-background text-muted-foreground flex h-10 w-full items-center gap-2 rounded-md border px-2 text-sm ${
          className ?? ''
        }`}
      >
        <SearchIcon className="size-4" />
        <span className="flex-1 text-left">Search...</span>
        <CommandShortcut>⌘K</CommandShortcut>
      </button>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
