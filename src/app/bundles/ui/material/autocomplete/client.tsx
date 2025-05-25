import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

export default function AutocompleteClient() {
  return <Autocomplete disablePortal options={[]} sx={{ width: 300 }} renderInput={(params) => <TextField {...params} label="Movie" />} />
}
