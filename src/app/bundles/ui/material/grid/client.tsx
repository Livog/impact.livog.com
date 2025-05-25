'use client'

import Grid from '@mui/material/Grid'

export default function GridClient() {
  return (
    <Grid container spacing={2}>
      <Grid size={8}>
        <li>size=8</li>
      </Grid>
      <Grid size={4}>
        <li>size=4</li>
      </Grid>
      <Grid size={4}>
        <li>size=4</li>
      </Grid>
      <Grid size={8}>
        <li>size=8</li>
      </Grid>
    </Grid>
  )
}
