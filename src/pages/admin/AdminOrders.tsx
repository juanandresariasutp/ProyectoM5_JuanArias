import React, { useEffect, useState } from 'react'
import { formatCurrency } from '../../utils/format'
import type { Order } from '../../types/order'
import { getAllOrders, updateOrderStatus } from '../../services/orders'

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const loadOrders = async () => {
    setLoading(true)
    try {
      const data = await getAllOrders()
      setOrders(data)
    } catch (error) {
      console.error('Error cargando órdenes', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    try {
      await updateOrderStatus(orderId, newStatus)
      await loadOrders() // recargar para mostrar el estado actualizado
    } catch (error) {
      alert('Error actualizando la orden')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-100'
      case 'cancelled': return 'bg-rose-50 text-rose-700 border-rose-100'
      default: return 'bg-amber-50 text-amber-700 border-amber-100'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente'
      case 'completed': return 'Completada'
      case 'cancelled': return 'Cancelada'
      default: return status
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-[#3e6b5b] mb-2">Creati Store</p>
        <h1 className="text-2xl font-semibold text-[#10211f]">Gestión de Órdenes</h1>
      </div>
      
      <div className="bg-white/85 backdrop-blur rounded-[2rem] shadow-[0_20px_80px_rgba(16,33,31,0.08)] overflow-hidden border border-black/5">
        {/* Tabla para desktop/tablet */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-black/5 text-[#10211f]">
          <thead className="bg-[#f5f7f5]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#5f6f6b] uppercase tracking-[0.2em]">Fecha / ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#5f6f6b] uppercase tracking-[0.2em]">Usuario</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#5f6f6b] uppercase tracking-[0.2em]">Total</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#5f6f6b] uppercase tracking-[0.2em]">Estado Actual</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-[#5f6f6b] uppercase tracking-[0.2em]">Acción (Cambiar a)</th>
            </tr>
          </thead>
          <tbody className="bg-transparent divide-y divide-black/5">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-4 text-center text-[#5f6f6b]">Cargando órdenes...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-4 text-center text-[#5f6f6b]">No hay órdenes registradas.</td></tr>
            ) : (
              orders.map(order => (
                <tr key={order.id} className="hover:bg-black/5">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-[#10211f] border-b border-black/5 pb-1 mb-1">
                      {order.id?.slice(0, 8)}...
                    </div>
                    <div className="text-xs text-[#5f6f6b]">
                      {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : 'Reciente'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#10211f]">{order.userEmail}</div>
                    <div className="text-xs text-[#5f6f6b]">{order.items.length} producto(s)</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#10211f]">
                    $ {formatCurrency(order.total, 2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <select
                      className="border border-black/10 p-2 rounded-xl text-sm bg-white text-[#10211f]"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id!, e.target.value as Order['status'])}
                    >
                      <option value="pending">Pendiente</option>
                      <option value="completed">Completada</option>
                      <option value="cancelled">Cancelada</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          </table>
        </div>

        {/* Tarjetas para móvil (evita scroll horizontal) */}
        <div className="md:hidden p-4">
          {loading ? (
            <div className="text-[#5f6f6b]">Cargando órdenes...</div>
          ) : orders.length === 0 ? (
            <div className="text-[#5f6f6b]">No hay órdenes registradas.</div>
          ) : (
            <div className="flex flex-col gap-3">
              {orders.map(order => (
                <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm border border-black/5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-medium text-[#10211f]">{order.id?.slice(0,8)}...</div>
                      <div className="text-xs text-[#5f6f6b]">{order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : 'Reciente'}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-[#10211f]">$ {formatCurrency(order.total, 2)}</div>
                      <div className={`mt-1 inline-flex px-2 text-xs leading-5 font-semibold rounded-full border ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs text-[#5f6f6b]">{order.userEmail}</div>
                    <div className="flex items-center gap-2">
                      <select
                        className="border border-black/10 p-2 rounded-xl text-sm bg-white text-[#10211f]"
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id!, e.target.value as Order['status'])}
                      >
                        <option value="pending">Pendiente</option>
                        <option value="completed">Completada</option>
                        <option value="cancelled">Cancelada</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminOrders