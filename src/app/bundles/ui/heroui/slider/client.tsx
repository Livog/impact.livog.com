'use client'

import { Slider } from '@heroui/react'

export function SliderPage() {
  return <Slider className="max-w-md" defaultValue={0.4} label="Temperature" maxValue={1} minValue={0} step={0.01} />
}
