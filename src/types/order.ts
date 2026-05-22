export type OrderItem = {
  product: import('../types/product').Product
  quantity: number
}

export type Order = {
  id?: string
  userId: string
  userEmail: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'completed' | 'cancelled'
  createdAt: any
}