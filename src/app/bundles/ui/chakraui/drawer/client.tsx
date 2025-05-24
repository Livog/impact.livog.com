'use client'

import { Drawer, Portal } from '@chakra-ui/react'

export function DrawerPage() {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button>Open Drawer</button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Drawer Title</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </Drawer.Body>
            <Drawer.Footer>
              <button type="button">Cancel</button>
              <button type="button">Save</button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <button type="button">Close</button>
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
