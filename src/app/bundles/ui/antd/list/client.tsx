'use client'

import { List } from 'antd'

export function ListPage() {
  return <List dataSource={['Item']} renderItem={(item) => <li>{item}</li>} />
}
