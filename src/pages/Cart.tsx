import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-8 text-center mt-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Tu carrito está vacío</h1>
        <p className="text-gray-500 mb-8">Parece que aún no has agregado ningún producto a tu carrito de compras.</p>
        <Link 
          to="/catalog" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          Volver al Catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        Carrito de Compras <span className="text-gray-500 text-xl font-normal ml-2">({totalItems} productos)</span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Columna de la lista de productos */}
        <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b text-sm font-bold text-gray-600 uppercase">
            <div className="col-span-6">Producto</div>
            <div className="col-span-3 text-center">Cantidad</div>
            <div className="col-span-3 text-right">Subtotal</div>
          </div>

          <div className="divide-y divide-gray-200">
            {items.map(item => (
              <div key={item.product.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 sm:p-6 items-center">
                {/* Producto Info */}
                <div className="col-span-1 sm:col-span-6 flex items-center gap-4">
                  <Link to={`/product/${item.product.id}`} className="shrink-0 flex-none">
                    <img 
                      src={item.product.image || 'https://placehold.co/100x100/png'} 
                      alt={item.product.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-gray-100 shadow-sm"
                    />
                  </Link>
                  <div className="flex flex-col justify-center">
                    <Link to={`/product/${item.product.id}`} className="font-bold text-gray-800 text-lg hover:text-blue-600 transition-colors">
                      {item.product.name}
                    </Link>
                    <p className="text-gray-500 font-medium text-sm mt-1">
                      Precio und: <span className="text-blue-600">${item.product.price}</span>
                    </p>
                    <button 
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium text-left mt-2 underline"
                    >
                      Quitar producto
                    </button>
                  </div>
                </div>

                {/* Cantidad Selector */}
                <div className="col-span-1 sm:col-span-3 flex sm:justify-center items-center mt-4 sm:mt-0">
                  <span className="sm:hidden font-medium text-gray-500 mr-4">Cantidad:</span>
                  <div className="flex items-center border border-gray-300 rounded-md bg-white">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-3 py-1 text-gray-500 hover:bg-gray-100 disabled:opacity-50 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 font-medium border-x border-gray-300 min-w-[2.5rem] text-center bg-gray-50">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-3 py-1 text-gray-500 hover:bg-gray-100 disabled:opacity-50 transition-colors"
                      disabled={typeof item.product.stock === 'number' && item.quantity >= (item.product.stock as number)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal Item */}
                <div className="col-span-1 sm:col-span-3 flex justify-between sm:justify-end items-center mt-2 sm:mt-0">
                  <span className="sm:hidden font-medium text-gray-500">Subtotal:</span>
                  <span className="font-bold text-xl text-gray-900 border-b-2 border-transparent">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pie de lista */}
          <div className="p-4 sm:p-6 bg-gray-50 border-t flex justify-start">
            <button 
              onClick={clearCart}
              className="text-sm text-gray-500 hover:text-red-600 font-medium transition-colors"
            >
              Vaciar carrito completo
            </button>
          </div>
        </div>

        {/* Columna del totalizador */}
        <div className="w-full lg:w-96 flex-none">
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen de compra</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Productos ({totalItems})</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span className="text-green-600 font-medium">¡Gratis!</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-gray-900">Total a pagar</span>
                <span className="font-extrabold text-3xl text-blue-600">${totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-500 text-right mt-1">Impuestos incluidos</p>
            </div>
            
            <Link 
              to="/checkout"
              className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg shadow transition-colors text-lg"
            >
              Continuar la compra
            </Link>
            
            <div className="mt-6 text-center">
              <Link to="/catalog" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
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