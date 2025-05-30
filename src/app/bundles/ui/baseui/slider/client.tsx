'use client'

import { Slider } from '@base-ui-components/react/slider'

export function SliderPage() {
  return (
    <Slider.Root defaultValue={50}>
      <Slider.Track>
        <Slider.Thumb />
      </Slider.Track>
    </Slider.Root>
  )
}
