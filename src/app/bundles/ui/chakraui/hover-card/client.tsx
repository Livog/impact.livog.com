'use client'

import { HoverCard, Portal } from '@chakra-ui/react'

export function HoverCardPage() {
  return (
    <HoverCard.Root size="sm">
      <HoverCard.Trigger asChild>
        <a href="#">@chakra_ui</a>
      </HoverCard.Trigger>
      <Portal>
        <HoverCard.Positioner>
          <HoverCard.Content>
            <HoverCard.Arrow />
            <div style={{ display: 'flex', gap: '1rem' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://pbs.twimg.com/profile_images/1244925541448286208/rzylUjaf_400x400.jpg"
                alt="Chakra UI"
                width={48}
                height={48}
              />
              <div>
                <div style={{ fontWeight: 600 }}>Chakra UI</div>
                <div style={{ fontSize: '0.875rem', color: 'gray' }}>
                  The most powerful toolkit for building modern web applications.
                </div>
                <div style={{ display: 'flex', alignItems: 'center', color: 'gray' }}>
                  <span style={{ fontSize: '0.75rem' }}>2.5M Downloads</span>
                </div>
              </div>
            </div>
          </HoverCard.Content>
        </HoverCard.Positioner>
      </Portal>
    </HoverCard.Root>
  )
}
