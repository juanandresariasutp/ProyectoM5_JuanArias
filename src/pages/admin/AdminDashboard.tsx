import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../../services/products'
import { getAllOrders } from '../../services/orders'
import { Link } from 'react-router-dom'

const AdminDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState({
    totalProducts: 0,
    lowStockCount: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const [products, orders] = await Promise.all([
          fetchProducts(),
          getAllOrders()
        ])

        const totalProducts = products.length
        const lowStockCount = products.filter(p => (p.stock ?? 0) <= 5).length
        
        const totalOrders = orders.length
        const pendingOrders = orders.filter(o => o.status === 'pending').length
        
        // Sumamos revenue solo de completadas y pendientes (asumiendo que las pagarán)
        const totalRevenue = orders
          .filter(o => o.status !== 'cancelled')
          .reduce((acc, current) => acc + current.total, 0)

        setMetrics({
          totalProducts,
          lowStockCount,
          totalOrders,
          pendingOrders,
          totalRevenue
        })
      } catch (error) {
        console.error('Error cargando métricas', error)
      } finally {
        setLoading(false)
      }
    }

    loadMetrics()
  }, [])

  if (loading) {
    return <div className="p-8 text-center text-[#10211f]">Cargando métricas...</div>
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-[#3e6b5b] mb-2">Creati Store</p>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#10211f]">Dashboard</h1>
      </div>
      <p className="text-[#5f6f6b]">Bienvenido al panel de control. Aquí tienes un resumen operativo.</p>

      {/* Grid mobile first: 1 columna en móvil, 2 en tablets, 3 en desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4">
        
        {/* Tarjeta Revenue */}
        <div className="bg-white/85 p-6 rounded-[2rem] shadow-[0_20px_80px_rgba(16,33,31,0.08)] border border-black/5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[#3e6b5b] uppercase tracking-[0.2em]">Ingresos Totales</h3>
            <p className="mt-2 text-3xl font-semibold text-[#10211f]">${metrics.totalRevenue.toFixed(2)}</p>
          </div>
          <div className="mt-4 text-xs text-[#5f6f6b]">Excluye órdenes canceladas</div>
        </div>

        {/* Tarjeta Órdenes */}
        <div className="bg-white/85 p-6 rounded-[2rem] shadow-[0_20px_80px_rgba(16,33,31,0.08)] border border-black/5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[#3e6b5b] uppercase tracking-[0.2em]">Órdenes Totales</h3>
            <p className="mt-2 text-3xl font-semibold text-[#10211f]">{metrics.totalOrders}</p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-medium text-[#3e6b5b]">{metrics.pendingOrders} pendientes</span>
            <Link to="/admin/orders" className="text-sm text-[#10211f] hover:text-[#3e6b5b] font-semibold">Ver todas &rarr;</Link>
          </div>
        </div>

        {/* Tarjeta Productos */}
        <div className="bg-white/85 p-6 rounded-[2rem] shadow-[0_20px_80px_rgba(16,33,31,0.08)] border border-black/5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[#3e6b5b] uppercase tracking-[0.2em]">Productos en Catálogo</h3>
            <p className="mt-2 text-3xl font-semibold text-[#10211f]">{metrics.totalProducts}</p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className={`text-sm font-medium ${metrics.lowStockCount > 0 ? 'text-[#3e6b5b]' : 'text-[#5f6f6b]'}`}>
              {metrics.lowStockCount} con stock crítico
            </span>
            <Link to="/admin/products" className="text-sm text-[#10211f] hover:text-[#3e6b5b] font-semibold">Gestionar &rarr;</Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminDashboard