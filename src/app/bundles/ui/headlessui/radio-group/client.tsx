'use client'

import { RadioGroup, Radio } from '@headlessui/react'
import { useState } from 'react'

export function RadioGroupPage() {
  const [selected, setSelected] = useState('startup')

  return (
    <RadioGroup value={selected} onChange={setSelected}>
      <Radio value="startup">Startup</Radio>
      <Radio value="enterprise">Enterprise</Radio>
    </RadioGroup>
  )
}
