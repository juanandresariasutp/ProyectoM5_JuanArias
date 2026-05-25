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
  
  const { addItem, openCart, items } = useCart()

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

  if (loading) return <div className="p-8 text-center text-xl text-[#10211f]">Cargando producto...</div>
  if (error) return <div className="p-8 text-center text-[#3e6b5b] font-bold">{error}</div>
  if (!product) return <div className="p-8 text-center text-xl text-[#10211f]">El producto que buscas no existe.</div>

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
  const cartQuantity = items.find(item => item.product.id === product.id)?.quantity ?? 0
  const stockValue = typeof product.stock === 'number' ? product.stock : Infinity
  const remainingStock = stockValue === Infinity ? Infinity : Math.max(stockValue - cartQuantity, 0)
  const limitReached = stockValue !== Infinity && remainingStock <= 0
  const canIncreaseQuantity = stockValue === Infinity || quantity < remainingStock

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <Link to="/catalog" className="text-[#3e6b5b] hover:text-[#10211f] font-semibold mb-6 inline-block transition-colors">
        &larr; Volver al catálogo
      </Link>
      
      <div className="flex flex-col md:flex-row gap-10 bg-white/85 backdrop-blur p-6 md:p-10 rounded-[2rem] shadow-[0_20px_80px_rgba(16,33,31,0.10)] border border-black/5">
        
        {/* Left Column: Image */}
        <div className="flex-1 rounded-[1.5rem] overflow-hidden bg-[#f1f4f2] flex items-center justify-center min-h-[320px] border border-black/5">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-[#5f6f6b]">Sin imagen</span>
          )}
        </div>
        
        {/* Right Column: Details */}
        <div className="flex-1 flex flex-col justify-center">
          
          {/* Tags */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="px-3 py-1 bg-[#eef3ef] text-[#3e6b5b] text-xs font-semibold rounded-full uppercase tracking-[0.2em] border border-black/5">
              {product.category || 'General'}
            </span>
            {isLowStock && (
              <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full uppercase tracking-[0.2em] border border-amber-100">
                Pocas unidades
              </span>
            )}
            {limitReached && (
              <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded-full uppercase tracking-[0.2em] border border-red-100">
                Límite alcanzado
              </span>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-semibold text-[#10211f] mb-3">
            {product.name}
          </h1>
          
          <p className="text-lg text-[#5f6f6b] mb-6 leading-relaxed">
            {product.description || 'Este producto no tiene descripción.'}
          </p>
          
          <hr className="border-black/5 mb-6" />
          
          {/* Price */}
          <div className="mb-8">
            <p className="text-sm font-bold text-[#3e6b5b] uppercase tracking-[0.35em] mb-2">Precio</p>
            <p className="text-4xl font-semibold text-[#10211f]">
              $ {Number(product.price).toLocaleString('es-AR')}
            </p>
          </div>
          
          {/* Info Grid (Stock / Category) */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <p className="text-sm font-semibold text-[#3e6b5b] uppercase tracking-[0.35em] mb-1">Stock</p>
              <p className="text-[#10211f] font-medium">
                {product.stock !== undefined ? `${product.stock} unidades` : 'No especificado'}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#3e6b5b] uppercase tracking-[0.35em] mb-1">Categoría</p>
              <p className="text-[#10211f] font-medium">{product.category || 'N/A'}</p>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col gap-6 mt-auto">
            {/* Quantity Selector (responsive) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <span className="font-medium text-[#10211f]">Cantidad:</span>
              <div className="flex items-center border border-black/5 rounded-xl bg-white overflow-hidden">
                <button 
                  onClick={handleDecrement}
                  disabled={quantity <= 1 || limitReached}
                  className="px-3 sm:px-4 py-2 text-[#10211f] hover:bg-black/5 disabled:opacity-40 transition-colors"
                >
                  -
                </button>
                <span className="px-3 sm:px-4 py-2 font-medium border-x border-black/5 w-12 text-center text-[#10211f]">
                  {quantity}
                </span>
                <button 
                  onClick={handleIncrement}
                  disabled={limitReached || !canIncreaseQuantity}
                  className="px-3 sm:px-4 py-2 text-[#10211f] hover:bg-black/5 disabled:opacity-40 transition-colors"
                >
                  +
                </button>
              </div>
              <div className="mt-1 sm:mt-0">
                {limitReached ? (
                  <div className="text-sm text-red-600 font-medium">Ya alcanzaste el stock disponible para este producto.</div>
                ) : stockValue !== Infinity ? (
                  <div className="text-sm text-[#5f6f6b] font-medium">Te quedan {remainingStock} unidad{remainingStock === 1 ? '' : 'es'} disponibles.</div>
                ) : null}
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart}
              disabled={limitReached}
              className={`w-full font-semibold text-lg py-4 px-6 rounded-2xl transition-all duration-200 disabled:cursor-not-allowed ${limitReached ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-[#3e6b5b] hover:opacity-95 text-white shadow-lg shadow-[#3e6b5b]/10'}`}
            >
              {limitReached ? 'Límite alcanzado' : 'Agregar al carrito'}
            </button>
 
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductDetail