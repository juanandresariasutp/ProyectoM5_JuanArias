import React from 'react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/format'
import type { CartItem } from '../contexts/CartContext'

type CartItemRowProps = {
  item: CartItem
  editable?: boolean
  onRemove?: (productId: string) => void
  onDecrease?: (productId: string, currentQuantity: number) => void
  onIncrease?: (productId: string, currentQuantity: number) => void
}

const CartItemRow: React.FC<CartItemRowProps> = ({ item, editable = false, onRemove, onDecrease, onIncrease }) => {
  const stockValue = typeof item.product.stock === 'number' ? item.product.stock : Infinity
  const canIncrease = stockValue === Infinity || item.quantity < stockValue

  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 sm:p-6 items-center">
      <div className="col-span-1 sm:col-span-6 flex items-center gap-4">
        <Link to={`/product/${item.product.id}`} className="shrink-0 flex-none">
          <img
            src={item.product.image || 'https://placehold.co/100x100/png'}
            alt={item.product.name}
            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl border border-black/5 shadow-sm"
          />
        </Link>
        <div className="flex flex-col justify-center">
          <Link to={`/product/${item.product.id}`} className="font-semibold text-[#10211f] text-lg hover:text-[#3e6b5b] transition-colors">
            {item.product.name}
          </Link>
          <p className="text-[#5f6f6b] font-medium text-sm mt-1">
            Precio und: <span className="text-[#3e6b5b]">$ {formatCurrency(item.product.price, 0)}</span>
          </p>
          {editable && onRemove && (
            <button
              onClick={() => onRemove(item.product.id)}
              className="text-red-600 hover:text-red-700 text-sm font-medium text-left mt-2 underline decoration-red-300 underline-offset-4"
            >
              Quitar producto
            </button>
          )}
        </div>
      </div>

      <div className="col-span-1 sm:col-span-3 flex sm:justify-center items-center mt-4 sm:mt-0">
        <span className="sm:hidden font-medium text-[#5f6f6b] mr-4">Cantidad:</span>
        {editable ? (
          <div className="flex items-center border border-black/5 rounded-xl bg-white overflow-hidden">
            <button
              onClick={() => onDecrease?.(item.product.id, item.quantity)}
              className="px-3 py-1 text-[#10211f] hover:bg-black/5 disabled:opacity-40 transition-colors"
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className="px-3 py-1 font-medium border-x border-black/5 min-w-[2.5rem] text-center text-[#10211f]">
              {item.quantity}
            </span>
            <button
              onClick={() => onIncrease?.(item.product.id, item.quantity)}
              className="px-3 py-1 text-[#10211f] hover:bg-black/5 disabled:opacity-40 transition-colors"
              disabled={typeof item.product.stock === 'number' && item.quantity >= (item.product.stock as number)}
            >
              +
            </button>
          </div>
        ) : (
          <span className="font-medium text-[#10211f]">{item.quantity}</span>
        )}
      </div>

      <div className="col-span-1 sm:col-span-3 flex justify-between sm:justify-end items-center mt-2 sm:mt-0">
        <span className="sm:hidden font-medium text-[#5f6f6b]">Subtotal:</span>
        <span className="font-semibold text-xl text-[#10211f] border-b-2 border-transparent">
          $ {formatCurrency(item.product.price * item.quantity, 2)}
        </span>
      </div>

      {!editable && !canIncrease && (
        <div className="col-span-full text-right text-xs text-[#5f6f6b]">Sin stock adicional disponible</div>
      )}
    </div>
  )
}

export default CartItemRow
