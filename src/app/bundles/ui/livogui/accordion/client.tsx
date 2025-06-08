'use client'

import Accordian from '@/components/livogui/accordion'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/livogui/collapsible'

export function AccordionPage() {
  return (
    <Accordian type="single" collapsible>
      <Collapsible>
        <CollapsibleTrigger>Accordion Item</CollapsibleTrigger>
        <CollapsibleContent>Accordion content</CollapsibleContent>
      </Collapsible>
    </Accordian>
  )
}
