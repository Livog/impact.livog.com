'use client'

import { Accordion } from '@chakra-ui/react'

export function AccordionPage() {
  const items = [
    { value: 'a', title: 'First Item', text: 'Some value 1...' },
    { value: 'b', title: 'Second Item', text: 'Some value 2...' },
    { value: 'c', title: 'Third Item', text: 'Some value 3...' },
  ]
  return (
    <Accordion.Root collapsible defaultValue={['b']}>
      {items.map((item, index) => (
        <Accordion.Item key={index} value={item.value}>
          <Accordion.ItemTrigger>
            <span style={{ flex: 1 }}>{item.title}</span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>{item.text}</Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
} 