'use client'

import { Flex } from '@chakra-ui/react'

export function FlexPage() {
  return (
    <Flex gap="4">
      <div style={{ height: 40, width: 40, background: '#eee' }} />
      <div style={{ height: 40, width: 40, background: '#ccc' }} />
      <div style={{ height: 40, width: 40, background: '#aaa' }} />
    </Flex>
  )
} 