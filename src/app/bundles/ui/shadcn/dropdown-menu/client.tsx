"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";

export function DropdownMenuPage() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
      <DropdownMenuContent>Menu content</DropdownMenuContent>
    </DropdownMenu>
  );
} 
