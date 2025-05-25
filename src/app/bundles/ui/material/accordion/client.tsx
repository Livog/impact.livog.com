'use client'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

export default function AccordionClient() {
  return (
    <Accordion>
      <AccordionSummary>Header</AccordionSummary>
      <AccordionDetails>Content</AccordionDetails>
    </Accordion>
  )
}
