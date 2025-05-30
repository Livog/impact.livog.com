'use client'

import { ScrollArea } from '@base-ui-components/react/scroll-area'

export function ScrollAreaPage() {
  return (
    <ScrollArea.Root style={{ width: 200, height: 100 }}>
      <ScrollArea.Viewport>
        <ScrollArea.Content style={{ height: 200 }}>Scrollable content</ScrollArea.Content>
        <ScrollArea.Scrollbar>
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
      </ScrollArea.Viewport>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  )
}
