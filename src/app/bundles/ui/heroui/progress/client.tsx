'use client'

import { Progress } from '@heroui/react'

export function ProgressPage() {
  return <Progress aria-label="Loading..." className="max-w-md" value={60} />
}
