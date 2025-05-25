'use client'

import { Dropdown } from 'antd'

const items = [{ key: '1', label: 'Item' }]

export function DropdownPage() {
  return (
    <Dropdown menu={{ items }}>
      <button type="button">Open</button>
    </Dropdown>
  )
}
