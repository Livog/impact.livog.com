"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";

export default function DropdownMenuPage() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
      <DropdownMenuContent>Menu content</DropdownMenuContent>
    </DropdownMenu>
  );
} 
