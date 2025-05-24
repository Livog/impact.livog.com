'use client'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export function AvatarPage() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
