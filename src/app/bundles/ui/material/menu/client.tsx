'use client'

import Menu from '@mui/material/Menu'
import { useState } from 'react'

export default function MenuClient() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  return (
    <>
      <button onClick={(e) => setAnchorEl(e.currentTarget)}>Open menu</button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <button onClick={() => setAnchorEl(null)}>Item</button>
      </Menu>
    </>
  )
}
