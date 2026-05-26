import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/format'
import { fetchProducts } from '../services/products'
import { useCart } from '../hooks/useCart'
import type { Product } from '../types/product'
import type { CartItem } from '../contexts/CartContext'

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const { addItem, openCart, totalItems, items } = useCart()

  useEffect(() => {
    fetchProducts()
      .then(p => setProducts(p))
      .catch(e => setError(e.message || String(e)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-8 text-center text-xl text-[#10211f]">Cargando productos...</div>
  if (error) return <div className="p-8 text-center text-[#3e6b5b] font-bold">Error: {error}</div>

  // Obtener categorías únicas de los productos (solo las válidas)
  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean))) as string[]
  const categoryCounts = products.reduce<Record<string, number>>((acc, product) => {
    const category = product.category || 'General'
    acc[category] = (acc[category] || 0) + 1
    return acc
  }, {})

  // Filtrar productos
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true
    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8">
      <div className="flex justify-between items-center mb-8 gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#3e6b5b] mb-2">Creati Store</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#10211f]">Catálogo de Productos</h1>
        </div>
        
        {/* Botón para abrir el carrito manualmente */}
        <button 
          onClick={openCart}
          className="flex items-center gap-2 bg-[#3e6b5b] hover:opacity-95 text-white px-4 py-2 rounded-xl font-semibold transition-colors shadow-lg shadow-[#3e6b5b]/10"
        >
          <span>🛒 Carrito</span>
          {totalItems > 0 && (
            <span className="bg-white text-[#10211f] text-xs px-2 py-1 rounded-full">
              {totalItems}
            </span>
          )}
        </button>
      </div>
      
      {/* Barra de Filtros y Búsqueda */}
      <div className="mb-8 rounded-[1.75rem] border border-black/5 bg-white/85 backdrop-blur p-4 sm:p-5 shadow-[0_10px_40px_rgba(16,33,31,0.08)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-5">
          <div className="flex-1">
            <p className="text-xs uppercase tracking-[0.35em] text-[#3e6b5b] font-semibold mb-2">Buscar</p>
            <input 
              type="text" 
              placeholder="Buscar por nombre..." 
              className="w-full border border-black/10 bg-white p-3.5 sm:p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3e6b5b]/30 text-[#10211f] placeholder:text-[#5f6f6b] shadow-[0_1px_0_rgba(16,33,31,0.03)]"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="min-w-0 flex-1 lg:flex-[1.15]">
            <div className="flex items-center justify-between gap-3 mb-2">
              <p className="text-xs uppercase tracking-[0.35em] text-[#3e6b5b] font-semibold">Categorías</p>
              <span className="text-xs text-[#5f6f6b]">{selectedCategory ? 'Filtro activo' : 'Explora por familia'}</span>
            </div>

            <div className="flex flex-wrap gap-2 pb-1">
              <button
                type="button"
                onClick={() => setSelectedCategory('')}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${selectedCategory === '' ? 'bg-[#3e6b5b] text-white border-[#3e6b5b] shadow-lg shadow-[#3e6b5b]/15' : 'bg-white text-[#10211f] border-black/10 hover:border-[#3e6b5b]/30 hover:text-[#3e6b5b] hover:bg-[#f5f7f5]'}`}
              >
                Todas <span className="ml-1 text-xs opacity-80">({products.length})</span>
              </button>

              {categories.map(cat => {
                const isActive = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${isActive ? 'bg-[#3e6b5b] text-white border-[#3e6b5b] shadow-lg shadow-[#3e6b5b]/15' : 'bg-white text-[#10211f] border-black/10 hover:border-[#3e6b5b]/30 hover:text-[#3e6b5b] hover:bg-[#f5f7f5]'}`}
                  >
                    {cat}
                    <span className={`ml-2 text-xs ${isActive ? 'text-white/80' : 'text-[#5f6f6b]'}`}>
                      ({categoryCounts[cat] ?? 0})
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-[#5f6f6b] border border-black/5 rounded-2xl bg-white/70">
          No se encontraron productos que coincidan con tu búsqueda.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(prod => (
            <div key={prod.id} className="group border border-black/5 p-4 rounded-2xl shadow-sm flex flex-col bg-white/85 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-[#3e6b5b]/45 hover:shadow-[0_20px_60px_rgba(62,107,91,0.18)] hover:bg-[#f9fbfa] hover:ring-1 hover:ring-[#3e6b5b]/15">
              <Link to={`/product/${prod.id}`} className="block group">
                {prod.image ? (
                  <div className="overflow-hidden mb-4 rounded-2xl">
                    <img src={prod.image} alt={prod.name} className="w-full h-56 object-cover group-hover:scale-[1.08] transition-transform duration-500 group-hover:brightness-[1.03]" />
                  </div>
                ) : (
                  <div className="w-full h-56 bg-[#f1f4f2] mb-4 rounded-2xl flex items-center justify-center text-[#5f6f6b]">Sin imagen</div>
                )}
              </Link>
              
              <div className="mb-2">
                <span className="text-xs font-bold text-[#3e6b5b] uppercase tracking-[0.2em]">{prod.category || 'General'}</span>
              </div>
              <Link to={`/product/${prod.id}`} className="block">
                <h3 className="font-semibold text-lg mb-1 truncate text-[#10211f] hover:text-[#3e6b5b] transition-colors" title={prod.name}>{prod.name}</h3>
              </Link>
              
              <p className="text-sm text-[#5f6f6b] flex-grow line-clamp-2 mb-4" title={prod.description}>
                {prod.description}
              </p>
              
                <div className="mt-auto border-t border-black/5 pt-4">
                {(() => {
                  const cartQuantity = items.find((item: CartItem) => item.product.id === prod.id)?.quantity ?? 0
                  const stockValue = typeof prod.stock === 'number' ? prod.stock : Infinity
                  const stockRemaining = stockValue === Infinity ? Infinity : Math.max(stockValue - cartQuantity, 0)
                  const limitReached = stockValue !== Infinity && stockRemaining <= 0
                  const lowStock = stockValue !== Infinity && stockRemaining > 0 && stockRemaining <= 10

                  return (
                    <>
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-xl text-[#10211f]">$ {formatCurrency(prod.price, 0)}</span>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`text-xs px-2 py-1 rounded-full font-semibold border ${limitReached ? 'bg-red-50 text-red-700 border-red-100' : lowStock ? 'bg-amber-50 text-amber-700 border-amber-100' : prod.stock === 0 ? 'bg-red-50 text-red-700 border-red-100' : 'bg-[#f5f7f5] text-[#3e6b5b] border-black/5'}`}>
                            {limitReached ? 'Límite alcanzado' : prod.stock === 0 ? 'Agotado' : `Stock: ${prod.stock ?? 0}`}
                          </span>
                          {lowStock && !limitReached && (
                            <span className="text-[11px] font-semibold text-amber-700">Pocas unidades</span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button 
                          onClick={() => {
                            addItem(prod)
                            openCart()
                          }}
                          disabled={limitReached || prod.stock === 0}
                          className={`w-full sm:w-1/2 text-center font-semibold py-2 rounded-xl transition-all duration-200 disabled:cursor-not-allowed disabled:shadow-none ${limitReached || prod.stock === 0 ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-[#3e6b5b] text-white hover:opacity-95 shadow-lg shadow-[#3e6b5b]/10'}`}
                        >
                          {limitReached ? 'Límite alcanzado' : prod.stock === 0 ? 'Sin stock' : 'Sumar'}
                        </button>
                        <Link 
                          to={`/product/${prod.id}`} 
                          className="w-full sm:w-1/2 text-center bg-white text-[#10211f] font-semibold py-2 rounded-xl border border-black/5 hover:bg-[#f5f7f5] hover:border-[#3e6b5b]/30 hover:text-[#3e6b5b] transition-colors"
                        >
                          Detalles
                        </Link>
                      </div>
                    </>
                  )
                })()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Catalog
