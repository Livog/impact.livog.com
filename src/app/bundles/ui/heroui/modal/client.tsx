'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@heroui/react'

export function ModalPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <>
      <button onClick={onOpen}>Open Modal</button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </ModalBody>
              <ModalFooter>
                <button onClick={onClose}>Close</button>
                <button onClick={onClose}>Action</button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
