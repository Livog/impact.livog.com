'use client'

import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/livogui/collapsible'

export function CollapsiblePage() {
  return (
    <Collapsible>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>Content</CollapsibleContent>
    </Collapsible>
  )
}
