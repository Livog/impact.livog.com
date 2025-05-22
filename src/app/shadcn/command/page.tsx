import * as React from "react";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandEmpty,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export default function CommandPage() {
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
  );
}
