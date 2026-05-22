import { collection, doc, writeBatch, serverTimestamp, increment } from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { Order } from '../types/order'

export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt'>): Promise<string> => {
  try {
    // Inicializamos un Batch para operaciones múltiples atómicas
    const batch = writeBatch(db)

    // 1. Preparamos el documento de la nueva orden
    const ordersRef = collection(db, 'orders')
    const newOrderRef = doc(ordersRef)

    batch.set(newOrderRef, {
      ...orderData,
      createdAt: serverTimestamp()
    })

    // 2. Preparamos la actualización (resta) del stock para cada producto
    orderData.items.forEach(item => {
      const productRef = doc(db, 'products', item.product.id)
      batch.update(productRef, {
        stock: increment(-item.quantity) // Restamos la cantidad comprada de forma segura
      })
    })

    // 3. Ejecutamos todas las operaciones al mismo tiempo
    await batch.commit()

    return newOrderRef.id
  } catch (error) {
    console.error("Error al crear la orden y actualizar stock:", error)
    throw error
  }
}