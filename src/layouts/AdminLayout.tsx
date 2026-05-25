import React, { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const AdminLayout: React.FC = () => {
  const { user } = useAuth()
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-[#3e6b5b] text-white shadow-sm' : 'text-[#10211f] hover:bg-black/5'
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-transparent text-[#10211f]">
      {/* Sidebar para pantallas >= sm */}
      <aside className="hidden sm:flex sm:w-72 bg-white/90 text-[#10211f] flex-col shadow-xl border-r border-black/5">
        <div className="p-6 border-b border-black/5">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <p className="text-sm text-[#3e6b5b] mt-1 break-all">{user?.email}</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            to="/admin" 
            className={`block px-4 py-3 rounded-xl font-medium transition-colors ${isActive('/admin')}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/admin/products" 
            className={`block px-4 py-3 rounded-xl font-medium transition-colors ${isActive('/admin/products')}`}
          >
            Productos
          </Link>
          <Link 
            to="/admin/orders" 
            className={`block px-4 py-3 rounded-xl font-medium transition-colors ${isActive('/admin/orders')}`}
          >
            Órdenes
          </Link>
        </nav>

        <div className="p-4 border-t border-black/5">
          <Link 
            to="/" 
            className="block w-full text-center px-4 py-2 bg-[#3e6b5b] hover:opacity-95 text-white rounded-xl text-sm font-semibold transition-colors"
          >
            Volver a la Tienda
          </Link>
        </div>
      </aside>

      {/* Sidebar móvil (offcanvas) */}
      {isSidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setIsSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-72 bg-white/95 text-[#10211f] z-50 shadow-xl flex flex-col border-r border-black/5">
            <div className="p-6 border-b border-black/5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Admin Panel</h2>
                  <p className="text-sm text-[#3e6b5b] mt-1 break-all">{user?.email}</p>
                </div>
                <button className="text-2xl leading-none text-[#10211f]" onClick={() => setIsSidebarOpen(false)}>&times;</button>
              </div>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              <Link to="/admin" className={`block px-4 py-3 rounded-lg font-medium transition-colors ${isActive('/admin')}`}>
                Dashboard
              </Link>
              <Link to="/admin/products" className={`block px-4 py-3 rounded-lg font-medium transition-colors ${isActive('/admin/products')}`}>
                Productos
              </Link>
              <Link to="/admin/orders" className={`block px-4 py-3 rounded-lg font-medium transition-colors ${isActive('/admin/orders')}`}>
                Órdenes
              </Link>
            </nav>

            <div className="p-4 border-t border-black/5">
              <Link to="/" className="block w-full text-center px-4 py-2 bg-[#3e6b5b] hover:opacity-95 text-white rounded-xl text-sm font-semibold transition-colors">Volver a la Tienda</Link>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-transparent">
        <header className="bg-white/80 backdrop-blur px-4 sm:px-8 py-4 shadow-sm border-b border-black/5 flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="sm:hidden mr-4 p-2 rounded-md text-[#10211f] hover:bg-black/5"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Abrir menú admin"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-[#10211f]">Centro de Control</h1>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-4 sm:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout
