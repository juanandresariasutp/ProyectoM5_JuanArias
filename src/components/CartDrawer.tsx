import React from 'react'
import { useCart } from '../hooks/useCart'
import { formatCurrency } from '../utils/format'
import { Link } from 'react-router-dom'
import type { CartItem } from '../contexts/CartContext'

const CartDrawer: React.FC = () => {
  const { isCartOpen, closeCart, items, removeItem, updateQuantity, totalPrice, totalItems } = useCart()

  if (!isCartOpen) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={closeCart}
      />
      
      <div className="fixed top-0 right-0 w-full max-w-sm h-full bg-white/95 backdrop-blur-xl shadow-2xl z-50 flex flex-col transform transition-transform border-l border-black/5 text-[#10211f]">
        <div className="p-4 border-b border-black/5 flex justify-between items-center bg-[#f5f7f5]">
          <h2 className="text-xl font-semibold">Tu Carrito ({totalItems})</h2>
          <button 
            onClick={closeCart}
            className="text-[#5f6f6b] hover:text-[#10211f] text-2xl leading-none font-bold"
          >
            &times;
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-[#5f6f6b] mt-10">
              <p>Tu carrito está vacío.</p>
            </div>
          ) : (
            items.map((item: CartItem) => (
              <div key={item.product.id} className="flex gap-4 border-b border-black/5 pb-4">
                <img 
                  src={item.product.image || 'https://placehold.co/100x100/png'} 
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-2xl"
                />
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-sm leading-tight mb-1 text-[#10211f]">{item.product.name}</h3>
                    <p className="text-[#3e6b5b] font-semibold">$ {formatCurrency(item.product.price, 2)}</p>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center border border-black/5 rounded-xl overflow-hidden bg-white">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-1 bg-white hover:bg-black/5 text-[#10211f] font-bold"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-3 text-sm text-[#10211f]">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-1 bg-white hover:bg-black/5 text-[#10211f] font-bold"
                        disabled={typeof item.product.stock === 'number' && item.quantity >= (item.product.stock as number)}
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-black/5 bg-[#f5f7f5]">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-[#10211f]">Total:</span>
            <span className="font-semibold text-2xl text-[#3e6b5b]">$ {formatCurrency(totalPrice, 2)}</span>
          </div>
          
          <Link 
            to="/cart" 
            onClick={closeCart}
            className={`block w-full text-center py-3 mb-2 border border-black/5 rounded-xl font-semibold text-[#10211f] transition-colors ${
              items.length === 0 
                ? 'opacity-50 cursor-not-allowed pointer-events-none' 
                : 'bg-white hover:bg-[#f5f7f5]'
            }`}
          >
            Ver carrito completo
          </Link>
          <Link 
            to="/checkout"
            onClick={closeCart}
            className={`block w-full text-center py-3 rounded-xl font-semibold text-white transition-colors ${
              items.length === 0 
                ? 'bg-[#9fb2ab] cursor-not-allowed pointer-events-none' 
                : 'bg-[#3e6b5b] hover:opacity-95'
            }`}
          >
            Ir a pagar
          </Link>
        </div>
      </div>
    </>
  )
}

export default CartDrawer