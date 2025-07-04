'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { getOverflowAncestors } from '@floating-ui/utils/dom'

export type Side = 'top' | 'bottom' | 'left' | 'right'
export type Align = 'start' | 'center' | 'end'

interface Refs {
  trigger: React.RefObject<HTMLElement | null>
  anchor: React.RefObject<HTMLElement | null>
  arrow: React.RefObject<HTMLElement | null>
}

interface UsePopoverPositionArgs {
  open: boolean
  refs: Refs
  side: Side
  align: Align
  offset: number
  smart: boolean
  padding?: number // Minimum distance from viewport edges
}

interface Position {
  x: number
  y: number
}

/** Calculates the alignment along an axis based on the alignment type. */
function alignAxis(start: number, refSize: number, floatSize: number, align: Align): number {
  if (align === 'start') return start
  if (align === 'end') return start + refSize - floatSize
  return start + (refSize - floatSize) / 2
}

/** Computes the initial position for a given side. */
function getPositionForSide(
  refRect: DOMRect,
  floatRect: DOMRect,
  side: Side,
  align: Align,
  spacing: number
): Position {
  if (side === 'top') {
    const x = alignAxis(refRect.left, refRect.width, floatRect.width, align)
    const y = refRect.top - floatRect.height - spacing
    return { x, y }
  }
  if (side === 'bottom') {
    const x = alignAxis(refRect.left, refRect.width, floatRect.width, align)
    const y = refRect.bottom + spacing
    return { x, y }
  }
  if (side === 'left') {
    const x = refRect.left - floatRect.width - spacing
    const y = alignAxis(refRect.top, refRect.height, floatRect.height, align)
    return { x, y }
  }
  // side === 'right'
  const x = refRect.right + spacing
  const y = alignAxis(refRect.top, refRect.height, floatRect.height, align)
  return { x, y }
}

/** Checks if the popover fits within the viewport on the primary axis for a given side. */
function isPositionGood(
  position: Position,
  floatRect: DOMRect,
  side: Side,
  vw: number,
  vh: number,
  padding: number
): boolean {
  const { x, y } = position
  if (side === 'top' || side === 'bottom') {
    return y >= padding && y + floatRect.height <= vh - padding
  }
  // side === 'left' || 'right'
  return x >= padding && x + floatRect.width <= vw - padding
}

/** Main positioning function with improved structure. */
function computePosition(
  reference: HTMLElement,
  floating: HTMLElement,
  arrow: HTMLElement | null,
  side: Side,
  align: Align,
  offset: number,
  smart: boolean,
  fixed: boolean,
  padding: number
) {
  const refRect = reference.getBoundingClientRect()
  const floatRect = floating.getBoundingClientRect()
  const arrowHalf = arrow ? arrow.offsetHeight / 2 : 0
  const spacing = offset + arrowHalf

  const vw = document.documentElement.clientWidth
  const vh = document.documentElement.clientHeight

  // Define the order of sides to try when smart positioning is enabled
  const sideOrders: Record<Side, Side[]> = {
    top: ['top', 'bottom', 'left', 'right'],
    bottom: ['bottom', 'top', 'right', 'left'],
    left: ['left', 'right', 'top', 'bottom'],
    right: ['right', 'left', 'bottom', 'top'],
  }

  let chosenSide = side
  let position = getPositionForSide(refRect, floatRect, side, align, spacing)

  // Smart placement: try each candidate side and pick the first that fits on the primary axis
  if (smart) {
    const candidates = sideOrders[side]
    for (const candidate of candidates) {
      const candidatePosition = getPositionForSide(refRect, floatRect, candidate, align, spacing)
      if (isPositionGood(candidatePosition, floatRect, candidate, vw, vh, padding)) {
        chosenSide = candidate
        position = candidatePosition
        break
      }
      // If no candidate fits, use the last candidate's position (matches original behavior)
      position = candidatePosition
      chosenSide = candidate
    }
  }

  // Clamp position to ensure the popover stays within the viewport
  let x = position.x
  let y = position.y

  // Initial clamping based on side (preserves original behavior)
  if (chosenSide === 'top' || chosenSide === 'bottom') {
    if (x < padding) x = padding
    if (x + floatRect.width > vw - padding) x = Math.max(padding, vw - padding - floatRect.width)
  } else {
    const referenceFullyVisibleVertically = refRect.top >= padding && refRect.bottom <= vh - padding
    if (referenceFullyVisibleVertically) {
      if (y < padding) y = padding
      if (y + floatRect.height > vh - padding) y = vh - padding - floatRect.height
    }
  }

  // Final clamp to ensure the popover is fully within the viewport
  x = Math.max(padding, Math.min(x, vw - padding - floatRect.width))

  if (arrow && (chosenSide === 'left' || chosenSide === 'right')) {
    const allowance = arrow.offsetHeight
    y = Math.max(padding - allowance, Math.min(y, vh - padding - floatRect.height + allowance))
  } else {
    y = Math.max(padding, Math.min(y, vh - padding - floatRect.height))
  }

  // Position the arrow
  let arrowX: number | undefined
  let arrowY: number | undefined
  if (arrow) {
    const inset = Math.max(4, arrowHalf)
    if (chosenSide === 'top' || chosenSide === 'bottom') {
      const targetX = refRect.left + refRect.width / 2
      arrowX = targetX - x - arrowHalf
      arrowX = Math.max(inset, Math.min(arrowX, floatRect.width - arrow.offsetWidth - inset))
    } else {
      const targetY = refRect.top + refRect.height / 2
      arrowY = targetY - y - arrowHalf
      arrowY = Math.max(inset, Math.min(arrowY, floatRect.height - arrow.offsetHeight - inset))
    }
  }

  // Adjust for scroll position unless fixed
  if (!fixed) {
    x += window.scrollX
    y += window.scrollY
  }

  return { x, y, side: chosenSide, arrowX, arrowY }
}

export const usePopoverPosition = ({ open, refs, side, align, offset, smart, padding = 8 }: UsePopoverPositionArgs) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const [resolvedSide, setResolvedSide] = useState<Side>(side)
  const [active, setActive] = useState(false)

  const cleanupRef = useRef<() => void>(() => {})

  // Tracks any pending close animation so it can be cancelled if the popover reopens mid-animation
  const pendingCloseRef = useRef<() => void | null>(null)

  const measure = useCallback(
    (fixed: boolean) => {
      const dialog = dialogRef.current
      const reference = refs.anchor.current ?? refs.trigger.current

      // Bail out early if the reference element is fully outside the viewport
      if (!dialog || !reference) return

      const rect = reference.getBoundingClientRect()
      const vw = document.documentElement.clientWidth || window.innerWidth
      const vh = document.documentElement.clientHeight || window.innerHeight

      // Determine if we should keep following the reference. For left/right popovers we allow
      // tracking as long as some part of the reference is still visible vertically (to maintain
      // the arrow connection). For top/bottom popovers we stick to the stricter rule that the
      // reference must remain fully within the padded viewport.

      const isHorizontal = side === 'left' || side === 'right'

      let shouldReposition: boolean

      if (isHorizontal) {
        // Continue to reposition while any part of the reference is within the padded vertical viewport.
        const verticallyVisible = rect.bottom > padding && rect.top < vh - padding
        shouldReposition = verticallyVisible
      } else {
        // Require full visibility for top/bottom popovers.
        shouldReposition =
          rect.top >= padding &&
          rect.left >= padding &&
          rect.bottom <= vh - padding &&
          rect.right <= vw - padding
      }

      if (!shouldReposition) return

      const arrow = refs.arrow.current
      const {
        x,
        y,
        side: s,
        arrowX,
        arrowY
      } = computePosition(reference, dialog, arrow, side, align, offset, smart, fixed, padding)

      dialog.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`
      dialog.style.setProperty('--popover-reference-width', `${reference.offsetWidth}px`)
      dialog.style.setProperty('--popover-reference-height', `${reference.offsetHeight}px`)
      dialog.style.setProperty('--popover-padding', `${padding}px`)

      // Expose current scrollbar width so CSS can account for it (e.g.,  overlay calculations)
      const scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth)
      dialog.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`)
      if (arrow) {
        if (arrowX == null) arrow.style.removeProperty('--arrow-x')
        else arrow.style.setProperty('--arrow-x', `${Math.round(arrowX)}px`)
        if (arrowY == null) arrow.style.removeProperty('--arrow-y')
        else arrow.style.setProperty('--arrow-y', `${Math.round(arrowY)}px`)
      }
      setResolvedSide(s)
    },
    [refs.anchor, refs.trigger, refs.arrow, side, align, offset, smart, padding]
  )

  const handleResize = useCallback(() => measure(false), [measure])

  const cleanup = useCallback(() => {
    window.removeEventListener('resize', handleResize)
    cleanupRef.current?.()
    cleanupRef.current = () => {}
  }, [handleResize])

  const mount = useCallback(() => {
    // If a close animation is in progress, cancel it
    if (pendingCloseRef.current) {
      pendingCloseRef.current()
      pendingCloseRef.current = null
    }

    const dialog = dialogRef.current
    if (!dialog) return

    measure(false)
    dialog.showPopover()
    requestAnimationFrame(() => {
      measure(false)
      dialog.dataset.state = 'open'
      setActive(true)
    })

    window.addEventListener('resize', handleResize)

    const handleScroll = () => measure(false)
    window.addEventListener('scroll', handleScroll, { passive: true })
    const reference = refs.anchor.current ?? refs.trigger.current
    if (!reference) return

    // Attach scroll listeners to all scrollable ancestor elements
    const scrollParents = getScrollParents(reference)
    scrollParents.forEach((el) => el.addEventListener('scroll', handleScroll, { passive: true }))

    const io = new IntersectionObserver(() => measure(false))
    const ro = new ResizeObserver(() => measure(false))
    io.observe(reference)
    ro.observe(reference)
    ro.observe(dialog)

    cleanupRef.current = () => {
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('scroll', handleScroll)
      scrollParents.forEach((el) => el.removeEventListener('scroll', handleScroll))
    }
  }, [measure, handleResize, refs.anchor, refs.trigger])

  const unmount = useCallback(
    (cb?: () => void) => {
      const dialog = dialogRef.current
      if (!dialog) {
        cb?.()
        return
      }
      const content = dialog.querySelector('.popover-content') as HTMLElement | null

      // Flip internal state so `.popover-content` gets `data-state="closed"` and animates out
      setActive(false)

      const tidy = () => {
        dialog.hidePopover()
        cleanup()
        cb?.()
      }

      if (!content) {
        tidy()
        return
      }

      // Wait for the content's exit transition before hiding / unmounting
      content.addEventListener('transitionend', tidy, { once: true })

      // Safety timeout in case `transitionend` never fires
      const dur = parseFloat(getComputedStyle(content).transitionDuration) || 0
      const timeoutId = setTimeout(tidy, dur * 1000 + 50)

      // Allow cancellation if the popover reopens before tidy fires
      pendingCloseRef.current = () => {
        content.removeEventListener('transitionend', tidy)
        clearTimeout(timeoutId)
      }
    },
    [cleanup]
  )

  useEffect(() => {
    if (open) measure(false)
  }, [open, measure])

  const setDialogRef = useCallback(
    (el: HTMLDialogElement | null) => {
      dialogRef.current = el

      // Trigger mount immediately if the popover should be open and the dialog just mounted
      if (el && open) {
        mount()
      }

      if (el == null) cleanup()
      return () => {
        dialogRef.current = null
        cleanup()
      }
    },
    [cleanup, mount, open]
  )

  const openPopover = useCallback(() => mount(), [mount])
  const closePopover = useCallback((cb?: () => void) => unmount(cb), [unmount])

  return { dialogRef, setDialogRef, resolvedSide, openPopover, closePopover, active }
}

function getScrollParents(element: HTMLElement | null): HTMLElement[] {
  if (!element) return []
  return getOverflowAncestors(element).filter((el): el is HTMLElement => el instanceof HTMLElement)
}
