'use client'

import { Card } from '@chakra-ui/react'

export function CardPage() {
  return (
    <Card.Root width="320px">
      <Card.Body gap="2">
        <Card.Title mt="2">Card Title</Card.Title>
        <Card.Description>
          This is the card body. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Card.Description>
      </Card.Body>
    </Card.Root>
  )
} 