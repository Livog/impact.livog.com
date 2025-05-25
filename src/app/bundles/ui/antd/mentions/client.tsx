'use client'

import { Mentions } from 'antd'

export function MentionsPage() {
  return <Mentions options={[{ value: 'user' }]} />
}
