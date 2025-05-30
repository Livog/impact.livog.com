'use client'

import { Accordion } from '@base-ui-components/react/accordion'

export function AccordionPage() {
  return (
    <Accordion.Root>
      <Accordion.Item>
        <Accordion.Header>
          <Accordion.Trigger>Open</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>Content</Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  )
}
