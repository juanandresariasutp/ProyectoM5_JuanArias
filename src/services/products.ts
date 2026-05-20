import { db } from '../lib/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import type { Product } from '../types/product'

export async function fetchProducts(): Promise<Product[]> {
  const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as Product[]
}
