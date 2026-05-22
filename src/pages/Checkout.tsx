import React from 'react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

const Checkout: React.FC = () => {
  const { items, totalPrice, totalItems, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleSimulatePayment = () => {
    // Por ahora solo simularemos el pago con un alert y limpiaremos el carrito
    alert(`¡Compra de $${totalPrice.toFixed(2)} procesada con éxito para ${user?.email}! (Simulación)`)
    clearCart()
    navigate('/')
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Finalizar Compra</h1>
        <p className="text-gray-600 mb-8">Tu carrito está vacío. ¡Agrega productos para continuar!</p>
        <Link 
          to="/catalog"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition"
        >
          Volver al Catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Finalizar Compra</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Resumen del pedido */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold border-b pb-4 mb-4">Resumen de tu pedido</h2>
          <div className="space-y-4 mb-4 max-h-96 overflow-y-auto pr-2">
            {items.map(item => (
              <div key={item.product.id} className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={item.product.image || 'https://placehold.co/50x50/png'} 
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium text-sm text-gray-800">{item.product.name}</p>
                    <p className="text-xs text-gray-500">Cant: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total ({totalItems} productos)</span>
              <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Datos de envío y pago (Simulación) */}
        <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold border-b pb-4 mb-4">Tus Datos</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
              <input 
                type="text" 
                disabled 
                value={user?.email || ''} 
                className="w-full p-2 border bg-gray-50 rounded text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Sesión iniciada correctamente.</p>
            </div>
          </div>
          
          <button 
            onClick={handleSimulatePayment}
            className="w-full mt-8 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition shadow-sm"
          >
            Confirmar y Pagar ${totalPrice.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkout