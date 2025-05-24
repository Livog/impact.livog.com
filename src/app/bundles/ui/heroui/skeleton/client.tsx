'use client'

import { Skeleton } from '@heroui/react'

export function SkeletonPage() {
  return (
    <Skeleton className="rounded-lg">
      <div className="bg-default-300 h-24 rounded-lg" />
    </Skeleton>
  )
}
