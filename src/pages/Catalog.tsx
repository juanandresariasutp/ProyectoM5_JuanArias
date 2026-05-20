import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../services/products'
import type { Product } from '../types/product'

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
      .then(p => setProducts(p))
      .catch(e => setError(e.message || String(e)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Cargando productos...</div>
  if (error) return <div className="text-red-600">Error: {error}</div>
  if (products.length === 0) return <div>No hay productos disponibles.</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map(prod => (
        <div key={prod.id} className="border p-4 rounded shadow-sm">
          {prod.image && <img src={prod.image} alt={prod.name} className="w-full h-48 object-cover mb-2" />}
          <h3 className="font-bold">{prod.name}</h3>
          <p className="text-sm text-gray-600">{prod.description}</p>
          <div className="mt-2 font-semibold">${prod.price}</div>
        </div>
      ))}
    </div>
  )
}

export default Catalog
