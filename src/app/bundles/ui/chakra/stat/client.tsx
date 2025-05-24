'use client'

import { Stat } from '@chakra-ui/react'

export function StatPage() {
  return (
    <Stat.Root>
      <Stat.Label>Unique visitors</Stat.Label>
      <Stat.ValueText>192.1k</Stat.ValueText>
    </Stat.Root>
  )
}
