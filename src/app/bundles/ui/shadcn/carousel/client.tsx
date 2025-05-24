'use client'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

export function CarouselPage() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>Item 1</CarouselItem>
        <CarouselItem>Item 2</CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
