'use client'

import { Flex } from 'antd'

export function FlexPage() {
  return (
    <Flex gap="small">
      <div style={{ width: 40, height: 40, background: '#eee' }} />
      <div style={{ width: 40, height: 40, background: '#ccc' }} />
      <div style={{ width: 40, height: 40, background: '#aaa' }} />
    </Flex>
  )
}
