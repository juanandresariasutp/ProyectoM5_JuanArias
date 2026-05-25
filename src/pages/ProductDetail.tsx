import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById } from '../services/products'
import { useCart } from '../contexts/CartContext'
import type { Product } from '../types/product'

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  
  const { addItem, openCart } = useCart()

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

  const handleIncrement = () => {
    if (quantity < (product.stock ?? Infinity)) {
      setQuantity(q => q + 1)
    }
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1)
    }
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    openCart()
  }

  const isLowStock = product.stock !== undefined && product.stock <= 10 && product.stock > 0

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <Link to="/catalog" className="text-blue-600 hover:text-blue-800 font-semibold mb-6 inline-block">
        &larr; Volver al catálogo
      </Link>
      
      <div className="flex flex-col md:flex-row gap-12 bg-white p-6 md:p-10 rounded-xl shadow-sm border border-gray-200">
        
        {/* Left Column: Image */}
        <div className="flex-1 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center min-h-[300px]">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="object-cover w-full h-full" 
            />
          ) : (
            <span className="text-gray-400">Sin imagen</span>
          )}
        </div>
        
        {/* Right Column: Details */}
        <div className="flex-1 flex flex-col justify-center">
          
          {/* Tags */}
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-blue-200 text-blue-800 text-xs font-semibold rounded-full uppercase tracking-wide">
              {product.category || 'General'}
            </span>
            {isLowStock && (
              <span className="px-3 py-1 bg-orange-200 text-orange-800 text-xs font-semibold rounded-full uppercase tracking-wide">
                Pocas unidades
              </span>
            )}
            {product.stock === 0 && (
              <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full uppercase tracking-wide">
                Agotado
              </span>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            {product.name}
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            {product.description || 'Este producto no tiene descripción.'}
          </p>
          
          <hr className="border-gray-200 mb-6" />
          
          {/* Price */}
          <div className="mb-8">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Precio</p>
            <p className="text-4xl font-bold text-blue-600">
              $ {Number(product.price).toLocaleString('es-AR')}
            </p>
          </div>
          
          {/* Info Grid (Stock / Category) */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-1">Stock</p>
              <p className="text-gray-800 font-medium">
                {product.stock !== undefined ? `${product.stock} unidades` : 'No especificado'}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-1">Categoría</p>
              <p className="text-gray-800 font-medium">{product.category || 'N/A'}</p>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col gap-6 mt-auto">
            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-700">Cantidad:</span>
              <div className="flex items-center border border-gray-300 rounded-md bg-white">
                <button 
                  onClick={handleDecrement}
                  disabled={quantity <= 1 || product.stock === 0}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 font-medium border-x border-gray-300 min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button 
                  onClick={handleIncrement}
                  disabled={product.stock === undefined || quantity >= product.stock || product.stock === 0}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
            </button>
 
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductDetail