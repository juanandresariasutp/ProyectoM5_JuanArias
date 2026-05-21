import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import type { Product } from '../types/product'

export type CartItem = {
  product: Product
  quantity: number
}

type CartState = {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }

const initialState: CartState = {
  items: []
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(item => item.product.id === action.payload.id)
      if (existingIndex >= 0) {
        const newItems = [...state.items]
        newItems[existingIndex].quantity += 1
        return { ...state, items: newItems }
      }
      return { ...state, items: [...state.items, { product: action.payload, quantity: 1 }] }
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
        items: state.items.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        )
      }
    }
    case 'CLEAR_CART': {
      return { items: [] }
    }
    default:
      return state
  }
}

type CartContextType = {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

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

  const addItem = (product: Product) => dispatch({ type: 'ADD_ITEM', payload: product })
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

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart debe ser usado dentro de un CartProvider')
  }
  return context
}