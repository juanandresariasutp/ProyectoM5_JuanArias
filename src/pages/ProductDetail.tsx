import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById } from '../services/products'
import type { Product } from '../types/product'

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    getProductById(id)
      .then(p => {
        if (!p) throw new Error("Producto no encontrado")
        setProduct(p)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="p-8 text-center text-xl text-gray-600">Cargando producto...</div>
  if (error) return <div className="p-8 text-center text-red-600 font-bold">{error}</div>
  if (!product) return <div className="p-8 text-center text-xl">El producto que buscas no existe.</div>

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8">
      <Link to="/catalog" className="text-blue-600 hover:text-blue-800 font-semibold mb-6 inline-block">
        &larr; Volver al catálogo
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border p-6 rounded-lg shadow-sm">
        <div className="flex justify-center items-center bg-gray-50 rounded-lg overflow-hidden h-64 md:h-96">
          {product.image ? (
            <img src={product.image} alt={product.name} className="object-contain w-full h-full" />
          ) : (
            <span className="text-gray-400">Sin imagen</span>
          )}
        </div>
        
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              {product.category || 'General'}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-3xl font-bold text-blue-600 mb-6">${product.price}</p>
          
          <p className="text-gray-700 leading-relaxed mb-8 border-b pb-8">
            {product.description || 'Este producto no tiene descripción.'}
          </p>
          
          <div className="mt-auto">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm font-semibold border">
                Stock: {product.stock ?? 0}
              </span>
            </div>
            
            <button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Añadir al carrito (Próximamente)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail