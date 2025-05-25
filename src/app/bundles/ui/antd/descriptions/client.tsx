'use client'

import { Descriptions } from 'antd'

export function DescriptionsPage() {
  return <Descriptions items={[{ key: '1', label: 'Name', children: 'John' }]} />
}
