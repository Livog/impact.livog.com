'use client'

import { Tag } from '@chakra-ui/react'

export function TagPage() {
  return (
    <>
      <Tag.Root>
        <Tag.Label>Plain Tag</Tag.Label>
      </Tag.Root>
      <Tag.Root>
        <Tag.Label>Closable Tag</Tag.Label>
        <Tag.EndElement>
          <Tag.CloseTrigger />
        </Tag.EndElement>
      </Tag.Root>
    </>
  )
}
