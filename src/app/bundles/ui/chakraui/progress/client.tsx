'use client'

import { Progress } from '@chakra-ui/react'

export function ProgressPage() {
  return (
    <Progress.Root maxW="240px">
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
  )
}
