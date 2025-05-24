'use client'

import { Select, SelectItem } from '@heroui/react'

export function SelectPage() {
  const animals = [
    { key: 'cat', label: 'Cat' },
    { key: 'dog', label: 'Dog' },
    { key: 'elephant', label: 'Elephant' },
    { key: 'lion', label: 'Lion' }
  ]
  return (
    <Select className="max-w-xs" label="Select an animal">
      {animals.map((animal) => (
        <SelectItem key={animal.key}>{animal.label}</SelectItem>
      ))}
    </Select>
  )
}
