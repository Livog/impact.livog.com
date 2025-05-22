"use client"

import { SidebarProvider, Sidebar } from "@/components/ui/sidebar";

export default function SidebarPage() {
  return (
    <SidebarProvider>
      <Sidebar />
    </SidebarProvider>
  );
} 
