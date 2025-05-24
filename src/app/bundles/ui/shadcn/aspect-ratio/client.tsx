'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'

export function AspectRatioPage() {
  return (
    <AspectRatio ratio={16 / 9}>
      <div style={{ background: '#eee', width: '100%', height: '100%' }}>AspectRatio</div>
    </AspectRatio>
  )
}
