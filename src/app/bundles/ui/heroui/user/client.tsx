'use client'

import { User } from '@heroui/react'

export function UserPage() {
  return (
    <User
      avatarProps={{
        src: 'https://i.pravatar.cc/150?u=a04258114e29026702d'
      }}
      description="Product Designer"
      name="Jane Doe"
    />
  )
}
