'use client'

import { Slider } from '@chakra-ui/react'

export function SliderPage() {
  return (
    <Slider.Root width="200px" defaultValue={[40]}>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
    </Slider.Root>
  )
}
