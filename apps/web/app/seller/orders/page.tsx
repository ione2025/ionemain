'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { orders as mockOrders } from '../../../data/orders';
import { SidebarLayoutWithHeader } from '../../../components/Sidebar';
import { useTranslations } from 'next-intl';
import { useCurrency } from '../../../contexts/CurrencyContext';
import { useAuth } from '../../../contexts/AuthContext';
import { fetchSellerOrders } from '../../../lib/orders';
import { isConfigValid } from '../../../lib/firebase';
import type { Order } from '../../../types';

export default function SellerOrdersPage() {
  const t = useTranslations('landing');
  const tOrders = useTranslations('orders');
  const { formatPrice } = useCurrency();
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOrders() {
      if (!user || user.role !== 'seller') {
        setOrders(mockOrders);
        setLoading(false);
        return;
      }

      try {
        if (isConfigValid) {
          // Fetch from Firestore
          const firestoreOrders = await fetchSellerOrders(user.id);
          if (firestoreOrders.length > 0) {
            setOrders(firestoreOrders);
          } else {
            // Fallback to mock orders if no orders found
            setOrders(mockOrders);
          }
        } else {
          // Use mock orders if Firebase not configured
          setOrders(mockOrders);
        }
      } catch (err) {
        console.error('Error loading orders:', err);
        setError('Failed to load orders');
        // Fallback to mock orders on error
        setOrders(mockOrders);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, [user]);

  const sidebarItems = [
    { href: '/seller', label: 'Dashboard', icon: '📊', translationKey: 'dashboard' },
    { href: '/seller/products', label: 'Products', icon: '📦', translationKey: 'products' },
    { href: '/seller/orders', label: 'Orders', icon: '🛒', translationKey: 'orders' },
    { href: '/seller/analytics', label: 'Analytics', icon: '📈', translationKey: 'analytics' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'shipped':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'pending':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
      case 'cancelled':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <SidebarLayoutWithHeader sidebarItems={sidebarItems} sidebarTitle={t('sellerDashboard')}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {tOrders('title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Manage customer orders</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-4 rounded-lg">
            {error}
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">{tOrders('noOrders')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {tOrders('orderNumber')}{order.orderNumber}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {tOrders(`status_${order.status}`)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Customer: {order.buyerName} ({order.buyerEmail})
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {tOrders('date')}: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-600 dark:text-gray-400">{tOrders('total')}</div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        {formatPrice(order.total)}
                      </div>
                    </div>
                    <Link
                      href={`/seller/orders/${order.id}`}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      {tOrders('viewDetails')}
                    </Link>
                  </div>
                </div>
                <div className="flex gap-4 overflow-x-auto">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 min-w-fit">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">
                          {item.productName}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          Qty: {item.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </SidebarLayoutWithHeader>
  );
}
