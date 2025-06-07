'use client'

/**
 * ⚠️  Popover implementation notes
 * - Keep the dialog in **manual** mode (`popover="manual"`). Auto mode closes on Escape/backdrop click *before*
 *   we rerun `computePosition`, causing a flash. Manual mode lets the `useLayoutEffect` reposition first.
 * - Stick with Floating‑UI strategy **'absolute'**. Using **'fixed'** adds scroll listeners and extra reflows,
 *   resulting in worse performance.
 */

import type { Side } from '@floating-ui/dom'

import React, {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
  type RefObject
} from 'react'
import { clsx } from 'clsx'
import { useFloatingPosition } from './use-floating-position'

type Align = 'start' | 'center' | 'end'

interface Refs {
  trigger: RefObject<HTMLElement | null>
  anchor: RefObject<HTMLElement | null>
  arrow: RefObject<HTMLElement | null>
}

interface Ctx {
  id: string
  open: boolean
  setOpen: (open: boolean) => void
  refs: Refs
  side: Side
  align: Align
  offset: number
  smart: boolean
  backdropClose: boolean
  escClose: boolean
}

const PopoverContext = createContext<Ctx | null>(null)

const usePopoverContext = () => {
  const ctx = useContext(PopoverContext)
  if (!ctx) throw new Error('Component must be inside <Popover>')
  return ctx
}

interface PopoverProps {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  side?: Side
  align?: Align
  offset?: number
  smart?: boolean
  backdropClose?: boolean
  escClose?: boolean
}

export const Popover = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  side = 'bottom',
  align = 'center',
  offset = 6,
  smart = true,
  backdropClose = true,
  escClose = true
}: PopoverProps): ReactElement => {
  const id = `popover-${useId().replace(/[:«»]/g, '')}`

  const [openState, setOpenState] = useState<boolean>(controlledOpen ?? defaultOpen ?? false)

  useEffect(() => {
    if (controlledOpen === undefined) return
    setOpenState(controlledOpen)
  }, [controlledOpen])

  const trigger = useRef<HTMLElement>(null)
  const anchor = useRef<HTMLElement>(null)
  const arrow = useRef<HTMLElement>(null)
  const refs = { trigger, anchor, arrow }

  const setOpen = (value: boolean) => {
    if (value === openState) return
    setOpenState(value)
    onOpenChange?.(value)
  }

  return (
    <PopoverContext.Provider
      value={{
        id,
        open: openState,
        setOpen,
        refs,
        side,
        align,
        offset,
        smart,
        backdropClose,
        escClose
      }}>
      <div className="popover">{children}</div>
    </PopoverContext.Provider>
  )
}

interface TriggerProps extends React.ComponentPropsWithRef<'button'> {
  as?: React.ElementType
}

export const PopoverTrigger = ({
  as: Comp = 'button',
  children,
  className = 'button button-outline',
  ...rest
}: TriggerProps): ReactElement => {
  const { id, open, setOpen, refs } = usePopoverContext()

  return (
    <Comp
      ref={refs.trigger}
      aria-controls={id}
      aria-expanded={open ? 'true' : 'false'}
      onClick={() => setOpen(!open)}
      className={clsx('popover-trigger', className)}
      {...rest}>
      {children}
    </Comp>
  )
}

interface AnchorProps extends React.ComponentPropsWithRef<'span'> {
  as?: React.ElementType
}

export const PopoverAnchor = ({ as: Comp = 'span', children, className, ...rest }: AnchorProps): ReactElement => {
  const { refs } = usePopoverContext()

  return (
    <Comp ref={refs.anchor} className={clsx('popover-anchor', className)} {...rest}>
      {children}
    </Comp>
  )
}

interface ContentProps extends React.ComponentPropsWithRef<'dialog'> {
  as?: React.ElementType
}

export const PopoverContent = ({
  as: Comp = 'dialog',
  children,
  className,
  style,
  ...rest
}: ContentProps): ReactElement => {
  const { id, open, setOpen, refs, side, align, offset, smart, backdropClose, escClose } = usePopoverContext()

  const referenceRef = refs.anchor.current ? refs.anchor : refs.trigger

  const { floatingRef, resolvedSide: sideResolved } = useFloatingPosition({
    open,
    refs,
    side,
    align,
    offset,
    smart
  })

  useEffect(() => {
    if (!open) return
    const el = floatingRef.current
    if (!el) return

    const handleKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && escClose && setOpen(false)

    const handleClick = (e: MouseEvent) => {
      if (!el.matches(':popover-open')) return
      const t = e.target as Node
      if (backdropClose && !el.contains(t) && !referenceRef.current?.contains(t)) setOpen(false)
    }

    addEventListener('keydown', handleKeyDown)
    addEventListener('click', handleClick)

    return () => {
      removeEventListener('keydown', handleKeyDown)
      removeEventListener('click', handleClick)
    }
  }, [open, setOpen, referenceRef, escClose, backdropClose, floatingRef])

  return (
    <Comp ref={floatingRef} id={id} popover="manual" className="popover-wrapper" {...rest}>
      <div
        data-state={open ? 'open' : 'closed'}
        data-align={align}
        data-side={sideResolved}
        style={style}
        className={clsx('popover-content border-base-300 bg-base-100', className)}>
        {children}
      </div>
    </Comp>
  )
}

export const PopoverArrow = ({ className, ...props }: React.ComponentPropsWithRef<'span'>) => {
  const { refs } = usePopoverContext()

  return <span ref={refs.arrow} className={clsx('popover-arrow', className)} data-popover-arrow {...props} />
}
