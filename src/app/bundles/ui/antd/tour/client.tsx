'use client'

import { Tour } from 'antd'

export function TourPage() {
  return <Tour open steps={[{ title: 'Step', target: null }]} />
}
