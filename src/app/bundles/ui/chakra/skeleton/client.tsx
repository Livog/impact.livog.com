'use client'

import { Skeleton, SkeletonCircle } from '@chakra-ui/react'

export function SkeletonPage() {
  return (
    <>
      <SkeletonCircle size="12" />
      <Skeleton height="20px" />
      <Skeleton height="20px" width="80%" />
    </>
  )
}
