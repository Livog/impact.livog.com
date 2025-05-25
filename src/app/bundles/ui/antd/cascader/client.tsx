'use client'

import { Cascader } from 'antd'

export function CascaderPage() {
  return <Cascader options={[{ value: '1', label: 'One', children: [{ value: '1-1', label: 'Child' }] }]} />
}
