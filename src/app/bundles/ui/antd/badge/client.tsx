'use client'

import { Badge } from 'antd'

export function BadgePage() {
  return (
    <Badge count={5}>
      <span style={{ display: 'inline-block', width: 20, height: 20 }} />
    </Badge>
  )
}
