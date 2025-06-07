/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client'

import { useLayoutEffect, useRef, useState, useMemo, type RefObject } from 'react'
import type { Side, Placement as FloatingPlacement } from '@floating-ui/dom'

const loadFloatingUIDom = () => import('@floating-ui/dom')

type Align = 'start' | 'center' | 'end'

interface Refs {
  trigger: RefObject<HTMLElement | null>
  anchor: RefObject<HTMLElement | null>
  arrow: RefObject<HTMLElement | null>
}

interface UseFloatingPositionArgs {
  open: boolean
  refs: Refs
  side: Side
  align: Align
  offset: number
  smart: boolean
}

export const useFloatingPosition = ({ open, refs, side, align, offset, smart }: UseFloatingPositionArgs) => {
  const floatingRef = useRef<HTMLDialogElement>(null)

  const referenceRef = refs.anchor.current ? refs.anchor : refs.trigger
  const placement = useMemo(() => `${side}${align === 'center' ? '' : `-${align}`}` as FloatingPlacement, [side, align])
  const [resolvedSide, setResolvedSide] = useState<Side>(side)

  // we track whether we've ever imported @floating-ui/dom
  const floatingUILoadedRef = useRef(false)

  useLayoutEffect(() => {
    const reference = referenceRef.current
    const floating = floatingRef.current
    if (!reference || !floating) return

    // always sync the dialog's open state first
    open ? floating.showPopover?.() : floating.hidePopover?.()

    // no need to import if popover is closed and library hasn't been loaded yet
    if (!open && !floatingUILoadedRef.current) return

    let cleanup: (() => void) | undefined

    loadFloatingUIDom().then(({ computePosition, autoUpdate, offset: offsetFn, flip, shift, size, arrow: arrowFn }) => {
      floatingUILoadedRef.current = true

      const arrowHalf = (refs.arrow.current?.offsetHeight ?? 0) / 2

      const middleware = [
        offsetFn(offset + arrowHalf),
        shift({ padding: offset, altBoundary: true }),
        smart && flip({ padding: offset, altBoundary: true }),
        size({
          apply({ rects, elements }) {
            const { width, height } = rects.reference
            elements.floating.style.setProperty('--popover-reference-width', `${width}px`)
            elements.floating.style.setProperty('--popover-reference-height', `${height}px`)
          }
        }),
        refs.arrow.current && arrowFn({ element: refs.arrow.current })
      ].filter(Boolean)

      const apply = async () => {
        const {
          x,
          y,
          placement: resolved,
          middlewareData
        } = await computePosition(reference, floating, { strategy: 'absolute', placement, middleware })

        floating.style.transform = `translate(${x}px, ${y}px)`

        if (refs.arrow.current) {
          const { x: ax, y: ay } = middlewareData.arrow || {}
          const setOrRemove = (v: number | undefined, prop: string) =>
            v == null
              ? refs.arrow.current!.style.removeProperty(prop)
              : refs.arrow.current!.style.setProperty(prop, `${v}px`)
          setOrRemove(ax, '--arrow-x')
          setOrRemove(ay, '--arrow-y')
        }

        setResolvedSide(resolved.split('-').at(0) as Side)
      }

      if (!open) {
        apply()
        return
      }

      /* only keep auto‑update loop while the popover is open */
      if (open && !cleanup) {
        cleanup = autoUpdate(reference, floating, apply, {
          elementResize: true,
          layoutShift: false,
          animationFrame: true
        })
      }
    })

    return () => cleanup?.()
  }, [open, placement, offset, smart, referenceRef, refs.arrow])

  return { floatingRef, resolvedSide }
}
