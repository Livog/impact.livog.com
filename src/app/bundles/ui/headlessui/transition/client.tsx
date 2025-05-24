'use client'

import { Transition } from '@headlessui/react'
import { useState } from 'react'

export function TransitionPage() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen((open) => !open)}>Toggle</button>
      <Transition show={open}>
        <div className="transition duration-300 ease-in data-closed:opacity-0">I will fade in and out</div>
      </Transition>
    </>
  )
}
