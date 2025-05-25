'use client'

import RadioGroup from '@mui/material/RadioGroup'

export default function RadioGroupClient() {
  return (
    <RadioGroup>
      <label>
        <input type="radio" value="one" name="r" /> One
      </label>
      <label>
        <input type="radio" value="two" name="r" /> Two
      </label>
    </RadioGroup>
  )
}
