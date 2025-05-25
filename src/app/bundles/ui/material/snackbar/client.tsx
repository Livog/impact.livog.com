'use client'

import Snackbar from '@mui/material/Snackbar'
import { useState } from 'react'

export default function SnackbarClient() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Show snackbar</button>
      <Snackbar open={open} onClose={() => setOpen(false)} message="Message" />
    </>
  )
}
