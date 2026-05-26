import { createContext } from 'react'
import type { Product } from '../types/product'

export type CartItem = {
  product: Product
  quantity: number
}

export type CartContextType = {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)
