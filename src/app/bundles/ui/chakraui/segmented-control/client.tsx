'use client'

import { SegmentGroup } from '@chakra-ui/react'

export function SegmentedControlPage() {
  return (
    <SegmentGroup.Root defaultValue="React">
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={['React', 'Vue', 'Solid']} />
    </SegmentGroup.Root>
  )
}
