import React from 'react'
import { useCart } from '../contexts/CartContext'
import { Link } from 'react-router-dom'

const CartDrawer: React.FC = () => {
  const { isCartOpen, closeCart, items, removeItem, updateQuantity, totalPrice, totalItems } = useCart()

  if (!isCartOpen) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={closeCart}
      />
      
      <div className="fixed top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl z-50 flex flex-col transform transition-transform">
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold">Tu Carrito ({totalItems})</h2>
          <button 
            onClick={closeCart}
            className="text-gray-500 hover:text-gray-800 text-2xl leading-none font-bold"
          >
            &times;
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <p>Tu carrito está vacío.</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.product.id} className="flex gap-4 border-b pb-4">
                <img 
                  src={item.product.image || 'https://placehold.co/100x100/png'} 
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm leading-tight mb-1">{item.product.name}</h3>
                    <p className="text-blue-600 font-semibold">${item.product.price}</p>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center border rounded">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-3 text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold"
                        disabled={typeof item.product.stock === 'number' && item.quantity >= (item.product.stock as number)}
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-gray-600">Total:</span>
            <span className="font-bold text-2xl text-blue-600">${totalPrice.toFixed(2)}</span>
          </div>
          
          <Link 
            to="/checkout" // Por ahora es una ruta fantasma
            onClick={closeCart}
            className={`block w-full text-center py-3 rounded-lg font-bold text-white transition-colors ${
              items.length === 0 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700'
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