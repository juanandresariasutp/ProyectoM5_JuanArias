import React, { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { createOrder } from '../services/orders'
import { formatCurrency } from '../utils/format'

const Checkout: React.FC = () => {
  const { items, totalPrice, totalItems, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSimulatePayment = async () => {
    if (!user) return

    setIsProcessing(true)
    setError(null)

    try {
      // Simulación de delay de pasarela de pago
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Guardar en Firestore
      const orderId = await createOrder({
        userId: user.uid,
        userEmail: user.email || '',
        items: items,
        total: totalPrice,
        status: 'pending' // Estado inicial simulando que se debe confirmar el pago
      })

      alert(`¡Compra procesada con éxito! Tu ID de orden es: ${orderId}`)
      clearCart()
      navigate('/')
    } catch (err) {
      console.error(err)
      // Mostrar mensaje detallado si es un error de stock retornado por el servicio
      if (err instanceof Error && err.message.includes('Stock insuficiente')) {
        // Extraer la lista de productos insuficientes y mostrarlos tal cual
        setError(err.message)
      } else {
        setError('Hubo un problema procesando tu orden. Por favor intenta de nuevo.')
      }
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center bg-white/85 backdrop-blur rounded-[2rem] border border-black/5 px-6 shadow-[0_20px_80px_rgba(16,33,31,0.08)]">
        <h1 className="text-3xl font-semibold text-[#10211f] mb-4">Finalizar Compra</h1>
        <p className="text-[#5f6f6b] mb-8">Tu carrito está vacío. ¡Agrega productos para continuar!</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl border border-black/10 text-[#10211f] font-semibold bg-white hover:bg-[#f5f7f5] transition"
          >
            Volver atrás
          </button>
          <Link 
            to="/catalog"
            className="px-6 py-3 bg-[#3e6b5b] text-white font-semibold rounded-xl shadow-lg shadow-[#3e6b5b]/10 hover:opacity-95 transition"
          >
            Volver al Catálogo
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-semibold text-[#10211f]">Finalizar Compra</h1>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-black/10 bg-white text-[#10211f] font-semibold hover:bg-[#f5f7f5] transition"
        >
          Volver atrás
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Resumen del pedido */}
        <div className="bg-white/85 backdrop-blur p-6 rounded-[2rem] shadow-[0_20px_80px_rgba(16,33,31,0.08)] border border-black/5">
          <h2 className="text-xl font-semibold border-b border-black/5 pb-4 mb-4 text-[#10211f]">Resumen de tu pedido</h2>
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
                    <p className="font-medium text-sm text-[#10211f]">{item.product.name}</p>
                    <p className="text-xs text-[#5f6f6b]">Cant: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold text-[#10211f]">$ {formatCurrency(item.product.price * item.quantity, 2)}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-black/5 pt-4">
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total ({totalItems} productos)</span>
              <span className="text-[#3e6b5b]">$ {formatCurrency(totalPrice, 2)}</span>
            </div>
          </div>
        </div>

        {/* Datos de envío y pago (Simulación) */}
        <div className="bg-white/85 backdrop-blur p-6 rounded-[2rem] shadow-[0_20px_80px_rgba(16,33,31,0.08)] border border-black/5 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold border-b border-black/5 pb-4 mb-4 text-[#10211f]">Tus Datos</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#5f6f6b] mb-1">Correo Electrónico</label>
              <input 
                type="text" 
                disabled 
                value={user?.email || ''} 
                className="w-full p-3 border border-black/5 bg-[#f5f7f5] rounded-xl text-[#10211f]/60 cursor-not-allowed"
              />
              <p className="text-xs text-[#5f6f6b] mt-1">Sesión iniciada correctamente.</p>
            </div>
          </div>
          
          <button 
            onClick={handleSimulatePayment}
            disabled={isProcessing}
            className={`w-full mt-8 text-white font-semibold py-3 rounded-2xl transition shadow-sm ${
              isProcessing ? 'bg-[#9fb2ab] cursor-not-allowed text-white/80' : 'bg-[#3e6b5b] hover:opacity-95'
            }`}
          >
            {isProcessing ? 'Procesando pago...' : `Confirmar y Pagar $${formatCurrency(totalPrice, 2)}`}
          </button>
          {error && <p className="text-[#3e6b5b] text-sm mt-3 font-semibold">{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default Checkout