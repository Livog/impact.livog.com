'use client'

import { SidebarProvider, Sidebar } from '@/components/ui/sidebar'

export function SidebarPage() {
  return (
    <SidebarProvider>
      <Sidebar />
    </SidebarProvider>
  )
}
