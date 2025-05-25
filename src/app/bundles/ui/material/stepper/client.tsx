'use client'

import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

export default function StepperClient() {
  return (
    <Stepper>
      <Step>
        <StepLabel>One</StepLabel>
      </Step>
    </Stepper>
  )
}
