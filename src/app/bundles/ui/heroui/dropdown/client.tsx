'use client'

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react'

export function DropdownPage() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <button>Open Menu</button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
