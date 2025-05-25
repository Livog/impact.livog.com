'use client'

import { Steps } from 'antd'

const items = [{ title: 'First' }, { title: 'Second' }]

export function StepsPage() {
  return <Steps current={1} items={items} />
}
