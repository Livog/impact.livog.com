'use client'

import { Steps } from '@chakra-ui/react'

export function StepsPage() {
  return (
    <Steps.Root defaultStep={1} count={steps.length}>
      <Steps.List>
        {steps.map((step, index) => (
          <Steps.Item key={index} index={index} title={step.title}>
            <Steps.Indicator />
            <Steps.Title>{step.title}</Steps.Title>
            <Steps.Separator />
          </Steps.Item>
        ))}
      </Steps.List>

      {steps.map((step, index) => (
        <Steps.Content key={index} index={index}>
          {step.description}
        </Steps.Content>
      ))}
      <Steps.CompletedContent>All steps are complete!</Steps.CompletedContent>

      <div style={{ display: 'flex', gap: '8px' }}>
        <Steps.PrevTrigger asChild>
          <button>Prev</button>
        </Steps.PrevTrigger>
        <Steps.NextTrigger asChild>
          <button>Next</button>
        </Steps.NextTrigger>
      </div>
    </Steps.Root>
  )
}

const steps = [
  {
    title: 'Step 1',
    description: 'Step 1 description',
  },
  {
    title: 'Step 2',
    description: 'Step 2 description',
  },
  {
    title: 'Step 3',
    description: 'Step 3 description',
  },
]
