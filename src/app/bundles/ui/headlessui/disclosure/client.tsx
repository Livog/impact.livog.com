'use client'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'

export function DisclosurePage() {
  return (
    <Disclosure>
      <DisclosureButton className="py-2">Is team pricing available?</DisclosureButton>
      <DisclosurePanel className="text-gray-500">Yes! You can purchase a license that you can share with your entire team.</DisclosurePanel>
    </Disclosure>
  )
}
