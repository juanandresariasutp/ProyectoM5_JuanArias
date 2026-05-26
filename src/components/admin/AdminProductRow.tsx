import React from 'react'
import { formatCurrency } from '../../utils/format'
import type { Product } from '../../types/product'

type AdminProductRowProps = {
  product: Product
  onEdit: (product: Product) => void
  onDelete: (productId: string) => void
}

const AdminProductRow: React.FC<AdminProductRowProps> = ({ product, onEdit, onDelete }) => {
  return (
    <tr className="hover:bg-black/5">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {product.image && <img src={product.image} alt="" className="h-10 w-10 rounded-full object-cover mr-3 bg-black/5" />}
          <div className="text-sm font-medium text-[#10211f]">{product.name}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5f6f6b]">$ {formatCurrency(product.price, 0)}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5f6f6b]">{product.stock ?? 0} un.</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5f6f6b]">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#eef3ef] text-[#3e6b5b] border border-black/5">
          {product.category || 'Sin categoría'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap right-0 text-right text-sm font-medium">
        <button
          onClick={() => onEdit(product)}
          className="inline-flex items-center px-3 py-1 rounded-md bg-[#eef3ef] text-[#3e6b5b] hover:bg-[#e1ede6] mr-3 font-medium transition"
          aria-label={`Editar ${product.name}`}
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="inline-flex items-center px-3 py-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100 font-medium transition"
          aria-label={`Borrar ${product.name}`}
        >
          Borrar
        </button>
      </td>
    </tr>
  )
}

export default AdminProductRow
