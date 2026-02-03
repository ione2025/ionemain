import { db, isConfigValid } from './firebase';
import { collection, query, where, getDocs, orderBy, doc, getDoc } from 'firebase/firestore';
import { Order } from '../types';

/**
 * Fetch orders for a specific seller from Firestore
 * @param sellerId - The seller's user ID
 * @returns Array of orders
 */
export async function fetchSellerOrders(sellerId: string): Promise<Order[]> {
  if (!isConfigValid) {
    console.warn('Firebase not configured. Returning empty orders array.');
    return [];
  }

  try {
    const ordersRef = collection(db, 'orders');
    const q = query(
      ordersRef,
      where('sellerId', '==', sellerId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const orders: Order[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      orders.push({
        id: doc.id,
        ...data,
      } as Order);
    });

    return orders;
  } catch (error) {
    console.error('Error fetching seller orders:', error);
    throw error;
  }
}

/**
 * Fetch a single order by ID
 * @param orderId - The order ID
 * @returns Order object or null
 */
export async function fetchOrderById(orderId: string): Promise<Order | null> {
  if (!isConfigValid) {
    console.warn('Firebase not configured. Returning null.');
    return null;
  }

  try {
    const orderRef = doc(db, 'orders', orderId);
    const orderSnap = await getDoc(orderRef);

    if (orderSnap.exists()) {
      return {
        id: orderSnap.id,
        ...orderSnap.data(),
      } as Order;
    }

    return null;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
}

/**
 * Fetch orders for a specific buyer from Firestore
 * @param buyerId - The buyer's user ID
 * @returns Array of orders
 */
export async function fetchBuyerOrders(buyerId: string): Promise<Order[]> {
  if (!isConfigValid) {
    console.warn('Firebase not configured. Returning empty orders array.');
    return [];
  }

  try {
    const ordersRef = collection(db, 'orders');
    const q = query(
      ordersRef,
      where('buyerId', '==', buyerId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const orders: Order[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      orders.push({
        id: doc.id,
        ...data,
      } as Order);
    });

    return orders;
  } catch (error) {
    console.error('Error fetching buyer orders:', error);
    throw error;
  }
}
