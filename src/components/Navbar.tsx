import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'

const Navbar: React.FC = () => {
  const { user, role, logout } = useAuth()
  const { totalItems, openCart, clearCart } = useCart()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

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
                onClick={() => setIsMenuOpen(prev => !prev)}
                className="p-2 rounded-md text-[#10211f] hover:bg-black/5 transition"
                aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                )}
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
                  className="text-sm font-semibold text-[#10211f] hover:text-[#3e6b5b] transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/login?mode=register"
                  className="inline-flex items-center justify-center rounded-full bg-[#3e6b5b] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#3e6b5b]/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(62,107,91,0.22)] hover:bg-[#345b4e]"
                >
                  Crear Cuenta
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Menú móvil offcanvas */}
      {isMenuOpen && (
        <>
          <button
            type="button"
            aria-label="Cerrar menú"
            className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed left-3 right-3 top-[4.75rem] z-50 rounded-[1.75rem] border border-black/10 bg-white/95 p-5 text-[#10211f] shadow-[0_24px_60px_rgba(16,33,31,0.22)] backdrop-blur-xl sm:hidden">
            <div className="flex items-center justify-between pb-4 border-b border-black/5">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold text-[#10211f]">
                Creati <span className="text-[#3e6b5b]">Store</span>
              </Link>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full text-[#10211f] hover:bg-black/5" aria-label="Cerrar menú">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <nav className="mt-4 flex flex-col gap-2">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="rounded-2xl px-4 py-3 text-[#10211f]/85 font-medium hover:bg-[#f5f7f5] hover:text-[#10211f] transition">Inicio</Link>
              <Link to="/catalog" onClick={() => setIsMenuOpen(false)} className="rounded-2xl px-4 py-3 text-[#10211f]/85 font-medium hover:bg-[#f5f7f5] hover:text-[#10211f] transition">Catálogo</Link>
              {user && role === 'admin' && (
                <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="rounded-2xl px-4 py-3 text-[#3e6b5b] font-semibold hover:bg-[#eef5f1] transition">Panel Admin</Link>
              )}
              {user ? (
                <div className="mt-2 flex flex-col gap-2 rounded-3xl bg-[#f8faf8] p-2">
                  <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="rounded-2xl px-4 py-3 text-[#10211f]/80 font-medium hover:bg-white transition">Mis Órdenes</Link>
                  <button
                    onClick={() => { setIsMenuOpen(false); handleLogout(); }}
                    className="rounded-2xl px-4 py-3 text-left font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <div className="mt-2 flex flex-col gap-3 rounded-3xl bg-[#f8faf8] p-3">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-2xl px-4 py-3 text-[#10211f] font-semibold hover:bg-white transition"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/login?mode=register"
                    onClick={() => setIsMenuOpen(false)}
                    className="inline-flex items-center justify-center rounded-2xl bg-[#3e6b5b] px-4 py-3 text-white font-semibold shadow-lg shadow-[#3e6b5b]/15 hover:bg-[#345b4e] transition"
                  >
                    Crear Cuenta
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </>
      )}
    </nav>
  )
}

export default Navbar