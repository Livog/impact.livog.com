'use client'

import Select from '@mui/material/Select'

export default function SelectClient() {
  return (
    <Select native defaultValue="">
      <option value="" disabled>
        Choose
      </option>
      <option value="one">One</option>
    </Select>
  )
}
