'use client'

import { RatingGroup } from '@chakra-ui/react'

export function RatingPage() {
  return (
    <RatingGroup.Root count={5} defaultValue={3} size="sm">
      <RatingGroup.HiddenInput />
      <RatingGroup.Control />
    </RatingGroup.Root>
  )
}
