import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";

export default function DrawerPage() {
  return (
    <Drawer>
      <DrawerTrigger>Open Drawer</DrawerTrigger>
      <DrawerContent>Drawer content</DrawerContent>
    </Drawer>
  );
} 