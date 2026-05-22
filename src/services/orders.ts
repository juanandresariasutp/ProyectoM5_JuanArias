import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { Order } from '../types/order'

export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const ordersRef = collection(db, 'orders')
    const docRef = await addDoc(ordersRef, {
      ...orderData,
      createdAt: serverTimestamp()
    })
    return docRef.id
  } catch (error) {
    console.error("Error al crear la orden:", error)
    throw error
  }
}