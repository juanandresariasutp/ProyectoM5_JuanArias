import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import type { CartContextType } from '../contexts/CartContext'

export function useCart(): CartContextType {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart debe ser usado dentro de un CartProvider')
  }
  return context
}
