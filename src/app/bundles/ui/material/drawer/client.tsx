'use client'

import Drawer from '@mui/material/Drawer'
import { useState } from 'react'

export default function DrawerClient() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <button onClick={() => setOpen(false)}>Close</button>
      </Drawer>
    </>
  )
}
