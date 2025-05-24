'use client'

import { Avatar } from '@chakra-ui/react'

export function AvatarPage() {
  return (
    <Avatar.Root shape="full" size="lg">
      <Avatar.Fallback name="Random User" />
      <Avatar.Image src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04" />
    </Avatar.Root>
  )
}
