'use client'

import { PasswordInput } from '@chakra-ui/react'

export function PasswordInputPage() {
  return (
    <PasswordInput.Root>
      <PasswordInput.Label>Password</PasswordInput.Label>
      <PasswordInput.Input placeholder="Enter password" />
      <PasswordInput.Toggle />
    </PasswordInput.Root>
  )
}
