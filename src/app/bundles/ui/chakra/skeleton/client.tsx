'use client'

import { Skeleton, SkeletonCircle } from '@chakra-ui/react'

export function SkeletonPage() {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <SkeletonCircle size="12" />
      <div style={{ flex: 1 }}>
        <Skeleton height="20px" />
        <Skeleton height="20px" width="80%" />
      </div>
    </div>
  )
}
