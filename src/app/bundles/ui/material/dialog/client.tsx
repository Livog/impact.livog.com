'use client'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { useState } from 'react'

export default function DialogClient() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Open dialog</button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Dialog</DialogTitle>
        <DialogContent>Content</DialogContent>
        <DialogActions>
          <button onClick={() => setOpen(false)}>Close</button>
        </DialogActions>
      </Dialog>
    </>
  )
}
