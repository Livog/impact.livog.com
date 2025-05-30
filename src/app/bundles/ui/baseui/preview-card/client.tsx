'use client'

import { PreviewCard } from '@base-ui-components/react/preview-card'

export function PreviewCardPage() {
  return (
    <PreviewCard.Root>
      <PreviewCard.Trigger>Hover me</PreviewCard.Trigger>
      <PreviewCard.Portal>
        <PreviewCard.Backdrop />
        <PreviewCard.Positioner>
          <PreviewCard.Popup>Preview</PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  )
}
