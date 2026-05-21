import { db } from '../lib/firebase'
import { collection, getDocs, query, orderBy, doc, getDoc } from 'firebase/firestore'
import type { Product } from '../types/product'

export async function fetchProducts(): Promise<Product[]> {
  const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as Product[]
}

export async function getProductById(id: string): Promise<Product | null> {
  const ref = doc(db, 'products', id)
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  return { id: snap.id, ...(snap.data() as any) } as Product
}
