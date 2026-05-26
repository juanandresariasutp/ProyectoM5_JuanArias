import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import React from 'react'
import { CartProvider } from '../../contexts/CartContext'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../../contexts/AuthContext'
import Cart from '../../pages/Cart'
import { useCart } from '../../hooks/useCart'
import type { Product } from '../../types/product'

// Un componente wrapper genérico para envolver todas las pruebas
const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <CartProvider>
        <MemoryRouter>{children}</MemoryRouter>
      </CartProvider>
    </AuthProvider>
  )
}

// Simulamos los componentes para no depender del ruteo complejo
// Crearemos un componente "Catálogo Simulado" que use el cart context
const sampleProduct: Product = {
  id: 'prod-int-1',
  name: 'Producto de Integración',
  description: 'Descripción de prueba',
  price: 50,
  stock: 10,
  category: 'test',
  image: 'test.jpg'
}

const CatalogSimulator = () => {
  const { addItem, items } = useCart()

  return (
    <div>
      <h1>Catálogo</h1>
      <button onClick={() => addItem(sampleProduct, 2)}>Agregar 2 al Carrito</button>
      <div data-testid="cart-badge">{items.length}</div>
    </div>
  )
}

describe('Flujo de Integración del Carrito', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('debe permitir añadir productos y reflejar cambios en el carrito', async () => {
    render(
      <AppProviders>
        <CatalogSimulator />
        <Cart />
      </AppProviders>
    )

    // Al inicio está vacío
    expect(screen.getByTestId('cart-badge')).toHaveTextContent('0')
    expect(screen.getByText('Tu carrito está vacío')).toBeInTheDocument()

    // Simulamos que el usuario da click en agregar 2 productos
    const addBtn = screen.getByText('Agregar 2 al Carrito')
    fireEvent.click(addBtn)

    // Verificamos el badge
    expect(screen.getByTestId('cart-badge')).toHaveTextContent('1') // 1 producto distinto

    // Verificamos que el carrito muestre el producto y el total
    expect(screen.getByText('Producto de Integración')).toBeInTheDocument()
    
    // El subtotal/total puede renderizarse con punto o coma según locale
    const totals100 = screen.getAllByText((_, element) => {
      const text = element?.textContent?.replace(/\s/g, '') ?? ''
      return text.includes('$100.00') || text.includes('$100,00')
    })
    expect(totals100.length).toBeGreaterThan(0)

    // Cambiamos la cantidad desde el carrito (botón '+' para incrementar)
    const incrementBtn = screen.getByText('+')
    fireEvent.click(incrementBtn)

    // Ahora son 3 productos, el total debe ser 150 (con punto o coma según locale)
    const totals150 = screen.getAllByText((_, element) => {
      const text = element?.textContent?.replace(/\s/g, '') ?? ''
      return text.includes('$150.00') || text.includes('$150,00')
    })
    expect(totals150.length).toBeGreaterThan(0)

    // Lo eliminamos o lo vaciamos
    const clearBtn = screen.getByText('Vaciar carrito completo')
    fireEvent.click(clearBtn)

    expect(screen.getByText('Tu carrito está vacío')).toBeInTheDocument()
    expect(screen.getByTestId('cart-badge')).toHaveTextContent('0')
  })
})