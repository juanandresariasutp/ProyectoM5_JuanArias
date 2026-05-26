import React, { createContext, useEffect, useReducer, useState } from 'react'
import type { Product } from '../types/product'

export type CartItem = {
  product: Product
  quantity: number
}

type CartState = {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product, quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }

const initialState: CartState = {
  items: []
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(item => item.product.id === action.payload.product.id)
      const stock = typeof action.payload.product.stock === 'number' ? action.payload.product.stock : Infinity
      const qtyToAdd = action.payload.quantity ?? 1
      
      if (existingIndex >= 0) {
        const newItems = [...state.items]
        const current = newItems[existingIndex]
        if (current.quantity < stock) {
          const finalQty = Math.min(stock, current.quantity + qtyToAdd)
          newItems[existingIndex] = { ...current, quantity: finalQty }
        }
        return { ...state, items: newItems }
      }
      
      if (stock <= 0 || qtyToAdd <= 0) return state
      const finalQty = Math.min(stock, qtyToAdd)
      return { ...state, items: [...state.items, { product: action.payload.product, quantity: finalQty }] }
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload.productId)
      }
    }
    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        items: state.items.map(item => {
          if (item.product.id !== action.payload.productId) return item
          const requested = Math.max(1, action.payload.quantity)
          const stock = typeof item.product.stock === 'number' ? item.product.stock : Infinity
          const finalQty = Math.min(requested, stock)
          return { ...item, quantity: finalQty }
        })
      }
    }
    case 'CLEAR_CART': {
      return { items: [] }
    }
    default:
      return state
  }
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

// Función para cargar estado inicial desde localStorage
const initCart = (): CartState => {
  try {
    const localData = localStorage.getItem('cart_v1')
    return localData ? JSON.parse(localData) : initialState
  } catch (error) {
    return initialState
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, initCart)
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Sincronizar con localStorage cada vez que el estado cambia
  useEffect(() => {
    localStorage.setItem('cart_v1', JSON.stringify(state))
  }, [state])

  const addItem = (product: Product, quantity?: number) => dispatch({ type: 'ADD_ITEM', payload: { product, quantity } })
  const removeItem = (productId: string) => dispatch({ type: 'REMOVE_ITEM', payload: { productId } })
  const updateQuantity = (productId: string, quantity: number) => dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })
  
  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = state.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)

  return (
    <CartContext.Provider value={{
      items: state.items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      isCartOpen,
      openCart,
      closeCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

