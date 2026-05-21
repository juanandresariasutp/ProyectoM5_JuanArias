import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../services/products'
import type { Product } from '../types/product'

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    fetchProducts()
      .then(p => setProducts(p))
      .catch(e => setError(e.message || String(e)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-8 text-center text-xl">Cargando productos...</div>
  if (error) return <div className="p-8 text-center text-red-600 font-bold">Error: {error}</div>

  // Obtener categorías únicas de los productos (solo las válidas)
  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean))) as string[]

  // Filtrar productos
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true
    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800">Catálogo de Productos</h1>
      
      {/* Barra de Filtros y Búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-gray-50 p-4 rounded-lg border">
        <input 
          type="text" 
          placeholder="Buscar por nombre..." 
          className="border p-2 rounded w-full sm:w-1/2 focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select 
          className="border p-2 rounded w-full sm:w-1/4 focus:outline-none focus:border-blue-500 bg-white"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-gray-500 border rounded-lg bg-gray-50">
          No se encontraron productos que coincidan con tu búsqueda.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(prod => (
            <div key={prod.id} className="border p-4 rounded-lg shadow-sm flex flex-col bg-white hover:shadow-md transition-shadow">
              {prod.image ? (
                <img src={prod.image} alt={prod.name} className="w-full h-48 object-cover mb-4 rounded" />
              ) : (
                <div className="w-full h-48 bg-gray-200 mb-4 rounded flex items-center justify-center text-gray-400">Sin imagen</div>
              )}
              
              <div className="mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase">{prod.category || 'General'}</span>
              </div>
              <h3 className="font-bold text-lg mb-1 truncate" title={prod.name}>{prod.name}</h3>
              
              <p className="text-sm text-gray-600 flex-grow line-clamp-2 mb-4" title={prod.description}>
                {prod.description}
              </p>
              
              <div className="mt-auto border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-xl text-blue-600">${prod.price}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 font-semibold border">
                    Stock: {prod.stock ?? 0}
                  </span>
                </div>
                <Link 
                  to={`/product/${prod.id}`} 
                  className="w-full block text-center bg-gray-800 text-white font-semibold py-2 rounded hover:bg-gray-900 transition-colors"
                >
                  Ver Detalles
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Catalog
