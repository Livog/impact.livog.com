"use client"

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

export function SheetPage() {
  return (
    <Sheet>
      <SheetTrigger>Open Sheet</SheetTrigger>
      <SheetContent>Sheet content</SheetContent>
    </Sheet>
  );
} 
