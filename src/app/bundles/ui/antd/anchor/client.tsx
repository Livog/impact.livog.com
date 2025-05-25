'use client'

import { Anchor } from 'antd'

export function AnchorPage() {
  return <Anchor items={[{ key: '1', href: '#section', title: 'Section' }]} />
}
