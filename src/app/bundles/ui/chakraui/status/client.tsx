'use client'

import { Status } from '@chakra-ui/react'

export function StatusPage() {
  return (
    <>
      <Status.Root colorPalette="red">
        <Status.Indicator />
        Error
      </Status.Root>
      <Status.Root colorPalette="green">
        <Status.Indicator />
        Success
      </Status.Root>
    </>
  )
}
