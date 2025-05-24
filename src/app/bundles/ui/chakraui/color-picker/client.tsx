'use client'

import { ColorPicker, Portal, parseColor } from '@chakra-ui/react'

export function ColorPickerPage() {
  return (
    <ColorPicker.Root defaultValue={parseColor('#eb5e41')} maxW="200px">
      <ColorPicker.HiddenInput />
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.Input />
        <ColorPicker.Trigger />
      </ColorPicker.Control>
      <Portal>
        <ColorPicker.Positioner>
          <ColorPicker.Content>
            <ColorPicker.Area />
            <div style={{ display: 'flex', gap: '4px' }}>
              <ColorPicker.EyeDropper size="xs" variant="outline" />
              <ColorPicker.Sliders />
            </div>
          </ColorPicker.Content>
        </ColorPicker.Positioner>
      </Portal>
    </ColorPicker.Root>
  )
}
