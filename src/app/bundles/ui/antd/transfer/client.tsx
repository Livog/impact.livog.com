'use client'

import { Transfer } from 'antd'

export function TransferPage() {
  const dataSource = [
    { key: '1', title: 'Item 1' },
    { key: '2', title: 'Item 2' },
    { key: '3', title: 'Item 3' }
  ]

  return <Transfer dataSource={dataSource} targetKeys={[]} render={(item) => item.title} />
}
