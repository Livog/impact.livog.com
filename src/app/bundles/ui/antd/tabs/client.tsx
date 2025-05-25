'use client'

import { Tabs } from 'antd'

const items = [{ key: '1', label: 'Tab 1', children: <div>Tab 1</div> }]

export function TabsPage() {
  return <Tabs items={items} />
}
