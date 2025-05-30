'use client'

import { Avatar } from '@base-ui-components/react/avatar'

export function AvatarPage() {
  return (
    <div className="flex gap-2">
      <Avatar.Root>
        <Avatar.Image src="https://i.pravatar.cc/100?img=1" />
        <Avatar.Fallback>A</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root>
        <Avatar.Image src="https://i.pravatar.cc/100?img=2" />
        <Avatar.Fallback>B</Avatar.Fallback>
      </Avatar.Root>
    </div>
  )
}
