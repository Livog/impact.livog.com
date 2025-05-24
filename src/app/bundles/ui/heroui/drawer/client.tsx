'use client'

import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, useDisclosure } from '@heroui/react'

export function DrawerPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <>
      <button onClick={onOpen}>Open Drawer</button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">Drawer Title</DrawerHeader>
              <DrawerBody>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </DrawerBody>
              <DrawerFooter>
                <button onClick={onClose}>Close</button>
                <button onClick={onClose}>Action</button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}
