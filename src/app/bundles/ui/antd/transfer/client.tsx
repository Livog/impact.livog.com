'use client'

import { Transfer } from 'antd'

export function TransferPage() {
  return <Transfer dataSource={[]} targetKeys={[]} render={(item) => item.title} />
}
