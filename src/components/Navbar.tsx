import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'

const Navbar: React.FC = () => {
  const { user, role, logout } = useAuth()
  const { totalItems, openCart, clearCart } = useCart()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      clearCart() // Limpiamos el carrito (usando el reducer) al cerrar sesión
      navigate('/')
    } catch (error) {
      console.error('Error al cerrar sesión', error)
    }
  }

  return (
    <nav className="sticky top-0 z-30 w-full border-b border-black/5 bg-white/70 backdrop-blur-xl shadow-[0_12px_30px_rgba(16,33,31,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18 py-3">
          
          {/* Lado izquierdo: Logo y enlaces */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-semibold tracking-wide text-[#10211f]">
                Creati <span className="text-[#3e6b5b]">Store</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-[#10211f]/75 hover:border-[#3e6b5b] hover:text-[#10211f] transition-colors"
              >
                Inicio
              </Link>
              <Link
                to="/catalog"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-[#10211f]/75 hover:border-[#3e6b5b] hover:text-[#10211f] transition-colors"
              >
                Catálogo
              </Link>
            </div>
            {/* Botón hamburguesa visible solo en móvil */}
            <div className="sm:hidden flex items-center ml-3">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 rounded-md text-[#10211f] hover:bg-black/5"
                aria-label="Abrir menú"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Lado derecho: Carrito y Auth */}
          <div className="flex items-center space-x-4">
            <button
              onClick={openCart}
              className="relative p-2 text-[#10211f]/75 hover:text-[#10211f] transition-colors"
              aria-label="Abrir carrito"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-[#3e6b5b] rounded-full shadow-lg shadow-[#3e6b5b]/20">
                  {totalItems}
                </span>
              )}
            </button>

            {user ? (
              <div className="hidden sm:flex items-center space-x-4 ml-4 border-l border-black/10 pl-4">
                {role === 'admin' && (
                  <Link
                    to="/admin"
                    className="text-sm font-semibold text-[#3e6b5b] hover:text-[#10211f] transition-colors"
                  >
                    Panel Admin
                  </Link>
                )}
                <Link
                  to="/orders"
                  className="text-sm font-medium text-[#10211f]/75 hover:text-[#10211f] transition-colors"
                >
                  Mis Órdenes
                </Link>
                <span className="text-sm text-black/15">|</span>
                <span className="text-sm text-[#10211f]/65 max-w-[180px] truncate">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-full transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-4 ml-4 border-l border-black/10 pl-4">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-[#3e6b5b] hover:text-[#10211f] transition-colors"
                >
                  Iniciar Sesión
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Menú móvil offcanvas */}
      {isMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed top-0 left-0 w-72 h-full bg-white/95 backdrop-blur-xl z-50 shadow-2xl border-r border-black/10 p-4 text-[#10211f]">
            <div className="flex items-center justify-between mb-6">
              <Link to="/" className="text-lg font-semibold text-[#10211f]">Creati <span className="text-[#3e6b5b]">Store</span></Link>
              <button onClick={() => setIsMenuOpen(false)} className="text-2xl text-[#10211f]">&times;</button>
            </div>
            <nav className="flex flex-col space-y-3">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-[#10211f]/80 font-medium hover:text-[#10211f]">Inicio</Link>
              <Link to="/catalog" onClick={() => setIsMenuOpen(false)} className="text-[#10211f]/80 font-medium hover:text-[#10211f]">Catálogo</Link>
              {user && role === 'admin' && (
                <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-[#3e6b5b] font-semibold">Panel Admin</Link>
              )}
              {user ? (
                <>
                  <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="text-[#10211f]/75">Mis Órdenes</Link>
                  <button
                    onClick={() => { setIsMenuOpen(false); handleLogout(); }}
                    className="text-red-600 text-left font-semibold hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-full transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-[#3e6b5b]">Iniciar Sesión</Link>
              )}
            </nav>
          </div>
        </>
      )}
    </nav>
  )
}

export default Navbar