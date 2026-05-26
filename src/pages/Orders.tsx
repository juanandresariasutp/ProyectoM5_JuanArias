import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { getUserOrders } from '../services/orders'
import { formatCurrency } from '../utils/format'
import type { Order } from '../types/order'
import { Link } from 'react-router-dom'

const Orders: React.FC = () => {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return
      try {
        const userOrders = await getUserOrders(user.uid)
        setOrders(userOrders)
      } catch (error) {
        console.error("Error al cargar historial:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  if (loading) {
    return <div className="p-8 text-center">Cargando historial de órdenes...</div>
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Mis Órdenes</h1>
        <p className="text-gray-600 mb-8">Aún no has realizado ninguna compra.</p>
        <Link 
          to="/catalog"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition"
        >
          Explorar el Catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Historial de Órdenes</h1>
      
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className="bg-white border rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-50 border-b px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Orden ID</p>
                <p className="text-sm font-mono text-gray-900">{order.id}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Fecha</p>
                <p className="text-sm text-gray-900">
                  {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString('es-ES', { 
                    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                  }) : 'Fecha desconocida'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Estado</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status === 'pending' ? 'Pendiente' : 
                   order.status === 'completed' ? 'Completada' : 'Cancelada'}
                </span>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Total</p>
                <p className="text-lg font-bold text-blue-600">$ {formatCurrency(order.total, 2)}</p>
              </div>
            </div>
            
            <div className="p-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Productos comprados:</h4>
              <ul className="divide-y divide-gray-100">
                {order.items.map((item, index) => (
                  <li key={index} className="py-3 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.product.image || 'https://placehold.co/40x40/png'} 
                        alt={item.product.name} 
                        className="w-10 h-10 rounded object-cover border"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{item.product.name}</p>
                        <p className="text-xs text-gray-500">Cantidad: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">
                      $ {formatCurrency(item.product.price * item.quantity, 2)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders