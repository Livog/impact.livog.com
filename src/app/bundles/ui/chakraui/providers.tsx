'use client'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'

export function Providers({ children }: { children: React.ReactNode }) {
  if (!children) return null
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
}
