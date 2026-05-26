import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { formatCurrency } from '../utils/format'
import type { CartItem } from '../contexts/CartContext'
import CartItemRow from '../components/CartItemRow'

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-8 text-center mt-12 bg-white/85 backdrop-blur rounded-[2rem] border border-black/5 shadow-[0_20px_80px_rgba(16,33,31,0.08)]">
        <h1 className="text-3xl font-semibold text-[#10211f] mb-6">Tu carrito está vacío</h1>
        <p className="text-[#5f6f6b] mb-8">Parece que aún no has agregado ningún producto a tu carrito de compras.</p>
        <Link 
          to="/catalog" 
          className="inline-block bg-[#3e6b5b] hover:opacity-95 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
        >
          Volver al Catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-semibold text-[#10211f] mb-8">
        Carrito de Compras <span className="text-[#5f6f6b] text-xl font-normal ml-2">({totalItems} productos)</span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Columna de la lista de productos */}
        <div className="flex-1 bg-white/85 backdrop-blur border border-black/5 rounded-[2rem] shadow-[0_20px_80px_rgba(16,33,31,0.08)] overflow-hidden">
          <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-[#f5f7f5] border-b border-black/5 text-sm font-semibold text-[#5f6f6b] uppercase tracking-[0.2em]">
            <div className="col-span-6">Producto</div>
            <div className="col-span-3 text-center">Cantidad</div>
            <div className="col-span-3 text-right">Subtotal</div>
          </div>

          <div className="divide-y divide-black/5">
            {items.map((item: CartItem) => (
              <CartItemRow
                key={item.product.id}
                item={item}
                editable
                onRemove={removeItem}
                onDecrease={(productId, currentQuantity) => updateQuantity(productId, currentQuantity - 1)}
                onIncrease={(productId, currentQuantity) => updateQuantity(productId, currentQuantity + 1)}
              />
            ))}
          </div>
          
          {/* Pie de lista */}
          <div className="p-4 sm:p-6 bg-[#f5f7f5] border-t border-black/5 flex justify-start">
            <button 
              onClick={clearCart}
              className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors inline-flex items-center gap-2"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
              Vaciar carrito completo
            </button>
          </div>
        </div>

        {/* Columna del totalizador */}
        <div className="w-full lg:w-96 flex-none">
          <div className="bg-white/85 backdrop-blur rounded-[2rem] p-6 border border-black/5 sticky top-24 shadow-[0_20px_80px_rgba(16,33,31,0.08)]">
            <h2 className="text-xl font-semibold text-[#10211f] mb-6">Resumen de compra</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-[#5f6f6b]">
                <span>Productos ({totalItems})</span>
                <span className="font-medium">$ {formatCurrency(totalPrice, 2)}</span>
              </div>
              <div className="flex justify-between text-[#5f6f6b]">
                <span>Envío</span>
                <span className="text-[#3e6b5b] font-medium">¡Gratis!</span>
              </div>
            </div>
            
            <div className="border-t border-black/5 pt-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg text-[#10211f]">Total a pagar</span>
                <span className="font-semibold text-3xl text-[#3e6b5b]">$ {formatCurrency(totalPrice, 2)}</span>
              </div>
              <p className="text-xs text-[#5f6f6b] text-right mt-1">Impuestos incluidos</p>
            </div>
            
            <Link 
              to="/checkout"
              className="block w-full text-center bg-[#3e6b5b] hover:opacity-95 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-[#3e6b5b]/10 transition-colors text-lg"
            >
              Continuar la compra
            </Link>
            
            <div className="mt-6 text-center">
              <Link to="/catalog" className="text-sm font-medium text-[#3e6b5b] hover:text-[#10211f] transition-colors">
                &larr; Seguir comprando otros productos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart