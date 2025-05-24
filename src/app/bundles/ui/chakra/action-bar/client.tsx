'use client'

import { ActionBar } from '@chakra-ui/react'

export function ActionBarPage() {
  return (
    <ActionBar.Root>
      <ActionBar.Positioner>
        <ActionBar.Content>
          <ActionBar.CloseTrigger />
          <ActionBar.SelectionTrigger />
          <ActionBar.Separator />
        </ActionBar.Content>
      </ActionBar.Positioner>
    </ActionBar.Root>
  )
}
