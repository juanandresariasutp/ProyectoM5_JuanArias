import type { ReactNode } from 'react'
import { AuthProvider } from './AuthProvider'
import { CartProvider } from './CartProvider'

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  )
}
