'use client'

import { Collapse } from 'antd'

export function CollapsePage() {
  return <Collapse items={[{ key: '1', label: 'Panel', children: 'Content' }]} />
}
