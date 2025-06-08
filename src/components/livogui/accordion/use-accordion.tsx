'use client'

import { use } from 'react'
import { createContext } from 'react'

export interface AccordionContextValue {
  accordionId: string
  type: 'single' | 'multiple'
  collapsible: boolean
}

export const AccordionContext = createContext<AccordionContextValue | undefined>(undefined)

export function useAccordian() {
  const context = use(AccordionContext)
  return context
}
