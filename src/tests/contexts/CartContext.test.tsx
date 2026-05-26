import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import React from 'react'
import { CartProvider } from '../../providers'
import { useCart } from '../../hooks/useCart'
import type { Product } from '../../types/product'

const mockProduct: Product = {
  id: 'p1',
  name: 'Test Product',
  description: 'A test product',
  price: 100,
  stock: 5,
  category: 'test',
  image: 'test.jpg'
}

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  )

  it('debe inicializarse vacío', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.items).toEqual([])
    expect(result.current.totalItems).toBe(0)
    expect(result.current.totalPrice).toBe(0)
  })

  it('debe agregar un item correctamente', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => {
      result.current.addItem(mockProduct, 2)
    })
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
    expect(result.current.totalItems).toBe(2)
    expect(result.current.totalPrice).toBe(200)
  })

  it('debe incrementar la cantidad si el item ya existe y limitarse por el stock disponible', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => {
      result.current.addItem(mockProduct, 2)
      result.current.addItem(mockProduct, 4) // El stock de mockProduct es 5, 2+4 = 6 -> deberia ser 5 max
    })
    expect(result.current.items[0].quantity).toBe(5)
  })
  
  it('debe remover el item completamente al llamar removeItem', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => {
      result.current.addItem(mockProduct, 1)
      result.current.removeItem(mockProduct.id)
    })
    expect(result.current.items).toHaveLength(0)
  })
  
  it('debe obligar que el updateQuantity no exceda el stock (límite superior)', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => {
      result.current.addItem(mockProduct, 1)
      result.current.updateQuantity(mockProduct.id, 10) // should cap at 5
    })
    expect(result.current.items[0].quantity).toBe(5)
  })

  it('debe limpiar el carrito por completo', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => {
      result.current.addItem(mockProduct, 1)
      result.current.clearCart()
    })
    expect(result.current.items).toHaveLength(0)
  })
})