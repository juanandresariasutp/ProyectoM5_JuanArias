import { collection, doc, writeBatch, serverTimestamp, increment, query, where, getDocs, getDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { Order } from '../types/order'

type ProductStockDocument = {
  stock?: number
}

type OrderDocument = Omit<Order, 'id'>

export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt'>): Promise<string> => {
  try {
    // 0. Verificamos stock actual para cada producto antes de crear la orden
    const insufficient: string[] = []
    // Comprobamos stock con getDoc para cada producto
    for (const item of orderData.items) {
      const productRef = doc(db, 'products', item.product.id)
      const snap = await getDoc(productRef)
      const currentStock = snap.exists() ? (snap.data() as ProductStockDocument).stock ?? Infinity : Infinity
      if (currentStock < item.quantity) {
        insufficient.push(`${item.product.name} (disponible: ${currentStock}, solicitado: ${item.quantity})`)
      }
    }

    if (insufficient.length > 0) {
      throw new Error(`Stock insuficiente: ${insufficient.join('; ')}`)
    }

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

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  try {
    const ordersRef = collection(db, 'orders')
    // Obtenemos las órdenes del usuario
    const q = query(ordersRef, where('userId', '==', userId))
    const snapshot = await getDocs(q)
    
    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as OrderDocument)
    })) as Order[]

    // Ordenamos localmente por fecha de creación (de más nueva a más vieja)
    // Se hace localmente para evitar que Firebase pida crear un Índice Compuesto manual
    return orders.sort((a, b) => {
      const dateA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0
      const dateB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0
      return dateB - dateA
    })
  } catch (error) {
    console.error("Error obteniendo las órdenes:", error)
    throw error
  }
}
export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const ordersRef = collection(db, 'orders')
    const snapshot = await getDocs(ordersRef)
    
    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as OrderDocument)
    })) as Order[]

    return orders.sort((a, b) => {
      const dateA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0
      const dateB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0
      return dateB - dateA
    })
  } catch (error) {
    console.error("Error obteniendo todas las órdenes:", error)
    throw error
  }
}

export const updateOrderStatus = async (orderId: string, newStatus: Order['status']): Promise<void> => {
  try {
    const orderRef = doc(db, 'orders', orderId)
    const batch = writeBatch(db) // Usamos batch o simplemente updateDoc
    batch.update(orderRef, { status: newStatus })
    await batch.commit()
  } catch (error) {
    console.error("Error actualizando status de la orden:", error)
    throw error
  }
}
