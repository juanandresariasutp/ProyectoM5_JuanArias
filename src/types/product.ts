import type { Timestamp } from 'firebase/firestore'

export type Product = {
  id: string
  name: string
  description?: string
  price: number
  category?: string
  image?: string
  stock?: number
  createdAt?: Timestamp | null
}
