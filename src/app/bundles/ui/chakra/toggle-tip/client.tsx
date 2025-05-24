'use client'

import { ToggleTip } from '@chakra-ui/react'
import { LuInfo } from 'lucide-react'

export function ToggleTipPage() {
  return (
    <ToggleTip content="This is some additional information.">
      <button style={{ fontSize: '12px', background: 'none', border: 'none' }}>
        <LuInfo />
      </button>
    </ToggleTip>
  )
}
