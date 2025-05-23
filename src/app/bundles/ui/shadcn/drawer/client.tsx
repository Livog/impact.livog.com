"use client"

import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";

export function DrawerPage() {
  return (
    <Drawer>
      <DrawerTrigger>Open Drawer</DrawerTrigger>
      <DrawerContent>Drawer content</DrawerContent>
    </Drawer>
  );
} 
