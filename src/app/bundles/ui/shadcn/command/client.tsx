"use client"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from "@/components/ui/command"

export function CommandPage() {
  return (
    <CommandDialog open onOpenChange={() => {}}>
      <CommandInput placeholder="Search commands..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Group">
          <CommandItem>
            Item <CommandShortcut>⌘1</CommandShortcut>
          </CommandItem>
          <CommandSeparator />
          <CommandItem>
            Another item <CommandShortcut>⌘2</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
