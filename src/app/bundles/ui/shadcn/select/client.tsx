'use client'

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'

export function SelectPage() {
  return (
    <Select>
      <SelectTrigger>Select a fruit</SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectContent>
    </Select>
  )
}
