'use client'

import Backdrop from '@mui/material/Backdrop'
import { useState } from 'react'

export default function BackdropClient() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Show backdrop</button>
      <Backdrop open={open} onClick={() => setOpen(false)} />
    </>
  )
}
