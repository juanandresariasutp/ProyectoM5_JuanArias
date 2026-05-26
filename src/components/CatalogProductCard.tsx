import React from 'react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/format'
import type { Product } from '../types/product'

type CatalogProductCardProps = {
  product: Product
  cartQuantity: number
  onAddToCart: () => void
}

const CatalogProductCard: React.FC<CatalogProductCardProps> = ({ product, cartQuantity, onAddToCart }) => {
  const stockValue = typeof product.stock === 'number' ? product.stock : Infinity
  const stockRemaining = stockValue === Infinity ? Infinity : Math.max(stockValue - cartQuantity, 0)
  const limitReached = stockValue !== Infinity && stockRemaining <= 0
  const lowStock = stockValue !== Infinity && stockRemaining > 0 && stockRemaining <= 10

  return (
    <div className="group border border-black/5 p-4 rounded-2xl shadow-sm flex flex-col bg-white/85 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-[#3e6b5b]/45 hover:shadow-[0_20px_60px_rgba(62,107,91,0.18)] hover:bg-[#f9fbfa] hover:ring-1 hover:ring-[#3e6b5b]/15">
      <Link to={`/product/${product.id}`} className="block group">
        {product.image ? (
          <div className="overflow-hidden mb-4 rounded-2xl">
            <img src={product.image} alt={product.name} className="w-full h-56 object-cover group-hover:scale-[1.08] transition-transform duration-500 group-hover:brightness-[1.03]" />
          </div>
        ) : (
          <div className="w-full h-56 bg-[#f1f4f2] mb-4 rounded-2xl flex items-center justify-center text-[#5f6f6b]">Sin imagen</div>
        )}
      </Link>

      <div className="mb-2">
        <span className="text-xs font-bold text-[#3e6b5b] uppercase tracking-[0.2em]">{product.category || 'General'}</span>
      </div>
      <Link to={`/product/${product.id}`} className="block">
        <h3 className="font-semibold text-lg mb-1 truncate text-[#10211f] hover:text-[#3e6b5b] transition-colors" title={product.name}>{product.name}</h3>
      </Link>

      <p className="text-sm text-[#5f6f6b] flex-grow line-clamp-2 mb-4" title={product.description}>
        {product.description}
      </p>

      <div className="mt-auto border-t border-black/5 pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-xl text-[#10211f]">$ {formatCurrency(product.price, 0)}</span>
          <div className="flex flex-col items-end gap-1">
            <span className={`text-xs px-2 py-1 rounded-full font-semibold border ${limitReached ? 'bg-red-50 text-red-700 border-red-100' : lowStock ? 'bg-amber-50 text-amber-700 border-amber-100' : product.stock === 0 ? 'bg-red-50 text-red-700 border-red-100' : 'bg-[#f5f7f5] text-[#3e6b5b] border-black/5'}`}>
              {limitReached ? 'Límite alcanzado' : product.stock === 0 ? 'Agotado' : `Stock: ${product.stock ?? 0}`}
            </span>
            {lowStock && !limitReached && (
              <span className="text-[11px] font-semibold text-amber-700">Pocas unidades</span>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={onAddToCart}
            disabled={limitReached || product.stock === 0}
            className={`w-full sm:w-1/2 text-center font-semibold py-2 rounded-xl transition-all duration-200 disabled:cursor-not-allowed disabled:shadow-none ${limitReached || product.stock === 0 ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-[#3e6b5b] text-white hover:opacity-95 shadow-lg shadow-[#3e6b5b]/10'}`}
          >
            {limitReached ? 'Límite alcanzado' : product.stock === 0 ? 'Sin stock' : 'Sumar'}
          </button>
          <Link
            to={`/product/${product.id}`}
            className="w-full sm:w-1/2 text-center bg-white text-[#10211f] font-semibold py-2 rounded-xl border border-black/5 hover:bg-[#f5f7f5] hover:border-[#3e6b5b]/30 hover:text-[#3e6b5b] transition-colors"
          >
            Detalles
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CatalogProductCard
