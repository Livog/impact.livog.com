import React, { useId } from 'react'
import clsx from 'clsx'

import { AccordionContext } from './use-accordion'

type AccordianProps = {
  children: React.ReactNode
  className?: string
  type?: 'single' | 'multiple'
  collapsible?: boolean
}

const Accordian = ({ children, className, type = 'single', collapsible = false }: AccordianProps) => {
  const accordionId = useId()

  return (
    <AccordionContext value={{ accordionId, type, collapsible }}>
      <div className={clsx('accordion', className)}>{children}</div>
    </AccordionContext>
  )
}

Accordian.displayName = 'Accordian'

export default Accordian
