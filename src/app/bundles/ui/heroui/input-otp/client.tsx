'use client'

import React from 'react'
import { InputOtp } from '@heroui/react'

export function InputOtpPage() {
  const [value, setValue] = React.useState('')
  return (
    <InputOtp length={4} value={value} onValueChange={setValue} />
  )
}
