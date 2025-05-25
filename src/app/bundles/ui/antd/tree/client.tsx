'use client'

import { Tree } from 'antd'

export function TreePage() {
  return <Tree treeData={[{ title: 'Parent', key: '0-0', children: [{ title: 'Child', key: '0-0-0' }] }]} />
}
