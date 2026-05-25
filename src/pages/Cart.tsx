import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { formatCurrency } from '../utils/format'

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
            {items.map(item => (
              <div key={item.product.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 sm:p-6 items-center">
                {/* Producto Info */}
                <div className="col-span-1 sm:col-span-6 flex items-center gap-4">
                  <Link to={`/product/${item.product.id}`} className="shrink-0 flex-none">
                    <img 
                      src={item.product.image || 'https://placehold.co/100x100/png'} 
                      alt={item.product.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl border border-black/5 shadow-sm"
                    />
                  </Link>
                  <div className="flex flex-col justify-center">
                    <Link to={`/product/${item.product.id}`} className="font-semibold text-[#10211f] text-lg hover:text-[#3e6b5b] transition-colors">
                      {item.product.name}
                    </Link>
                    <p className="text-[#5f6f6b] font-medium text-sm mt-1">
                      Precio und: <span className="text-[#3e6b5b]">$ {formatCurrency(item.product.price, 0)}</span>
                    </p>
                    <button 
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium text-left mt-2 underline decoration-red-300 underline-offset-4"
                    >
                      Quitar producto
                    </button>
                  </div>
                </div>

                {/* Cantidad Selector */}
                <div className="col-span-1 sm:col-span-3 flex sm:justify-center items-center mt-4 sm:mt-0">
                  <span className="sm:hidden font-medium text-[#5f6f6b] mr-4">Cantidad:</span>
                  <div className="flex items-center border border-black/5 rounded-xl bg-white overflow-hidden">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-3 py-1 text-[#10211f] hover:bg-black/5 disabled:opacity-40 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 font-medium border-x border-black/5 min-w-[2.5rem] text-center text-[#10211f]">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-3 py-1 text-[#10211f] hover:bg-black/5 disabled:opacity-40 transition-colors"
                      disabled={typeof item.product.stock === 'number' && item.quantity >= (item.product.stock as number)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal Item */}
                <div className="col-span-1 sm:col-span-3 flex justify-between sm:justify-end items-center mt-2 sm:mt-0">
                  <span className="sm:hidden font-medium text-[#5f6f6b]">Subtotal:</span>
                  <span className="font-semibold text-xl text-[#10211f] border-b-2 border-transparent">
                    $ {formatCurrency(item.product.price * item.quantity, 2)}
                  </span>
                </div>
              </div>
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