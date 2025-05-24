'use client'

import { EmptyState } from '@chakra-ui/react'
import { LuShoppingCart } from 'lucide-react'

export function EmptyStatePage() {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <LuShoppingCart />
        </EmptyState.Indicator>
        <div style={{ textAlign: 'center' }}>
          <EmptyState.Title>Your cart is empty</EmptyState.Title>
          <EmptyState.Description>
            Explore our products and add items to your cart
          </EmptyState.Description>
        </div>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}
