'use client'

import { Clipboard } from '@chakra-ui/react'

export function ClipboardPage() {
  return (
    <Clipboard.Root value="https://chakra-ui.com">
      <Clipboard.Trigger asChild>
        <button>
          <Clipboard.Indicator />
        </button>
      </Clipboard.Trigger>
    </Clipboard.Root>
  )
}
