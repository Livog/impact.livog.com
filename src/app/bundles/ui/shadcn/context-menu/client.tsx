'use client'

import { ContextMenu, ContextMenuTrigger, ContextMenuContent } from '@/components/ui/context-menu'

export function ContextMenuPage() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>Right click me</ContextMenuTrigger>
      <ContextMenuContent>Menu content</ContextMenuContent>
    </ContextMenu>
  )
}
