import React from 'react'
import { formatCurrency } from '../../utils/format'
import type { Product } from '../../types/product'

type AdminProductMobileCardProps = {
  product: Product
  onEdit: (product: Product) => void
  onDelete: (productId: string) => void
}

const AdminProductMobileCard: React.FC<AdminProductMobileCardProps> = ({ product, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl p-3 shadow-sm border border-black/5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {product.image && <img src={product.image} alt="" className="h-12 w-12 rounded-full object-cover bg-black/5" />}
        <div>
          <div className="text-sm font-medium text-[#10211f]">{product.name}</div>
          <div className="text-xs text-[#5f6f6b]">{product.category || 'Sin categoría'}</div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <div className="text-sm text-[#5f6f6b]">$ {formatCurrency(product.price, 0)}</div>
        <div className="text-xs text-[#5f6f6b]">{product.stock ?? 0} un.</div>
        <div className="flex gap-2 mt-2">
          <button onClick={() => onEdit(product)} className="px-3 py-1 rounded-md bg-[#eef3ef] text-[#3e6b5b] hover:bg-[#e1ede6] text-sm font-medium">Editar</button>
          <button onClick={() => onDelete(product.id)} className="px-3 py-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100 text-sm font-medium">Borrar</button>
        </div>
      </div>
    </div>
  )
}

export default AdminProductMobileCard
