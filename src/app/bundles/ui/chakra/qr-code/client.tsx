'use client'

import { QrCode } from '@chakra-ui/react'

export function QrCodePage() {
  return (
    <QrCode.Root value="https://www.google.com">
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>
    </QrCode.Root>
  )
}
