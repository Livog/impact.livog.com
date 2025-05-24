'use client'

import { IconButton } from '@chakra-ui/react'
import { LuSearch } from 'lucide-react'

export function IconButtonPage() {
  return (
    <IconButton aria-label="Search">
      <LuSearch />
    </IconButton>
  )
}
