'use client'

import { Popover, Portal } from '@chakra-ui/react'

export function PopoverPage() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button>Click me</button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body>
              <Popover.Title fontWeight="medium">Naruto Form</Popover.Title>
              <p style={{ margin: '1rem 0' }}>
                Naruto is a Japanese manga series written and illustrated by
                Masashi Kishimoto.
              </p>
              <input placeholder="Your fav. character" style={{ fontSize: '0.875rem' }} />
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}
