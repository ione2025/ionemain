'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useCurrency } from '../../../contexts/CurrencyContext';
import { SidebarLayout } from '../../../components/Sidebar';
import { useTranslations } from 'next-intl';
import { orders } from '../../../data/orders';

export default function OrdersPage() {
  const { user, isLoading } = useAuth();
  const { formatPrice } = useCurrency();
  const router = useRouter();
  const t = useTranslations('orders');
  const tSidebar = useTranslations('sidebar');
  const tCommon = useTranslations('common');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-gray-900 dark:text-white">{tCommon('loading')}</div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const sidebarItems = [
    { href: '/account', label: 'Profile', icon: '👤', translationKey: 'profile' },
    { href: '/account/orders', label: 'Orders', icon: '📦', translationKey: 'orders' },
    { href: '/account/addresses', label: 'Addresses', icon: '📍', translationKey: 'addresses' },
    { href: '/account/payments', label: 'Payment Methods', icon: '💳', translationKey: 'payments' },
  ];

  // Filter orders for current buyer
  const userOrders = orders.filter(order => order.buyerId === user.id || order.buyerEmail === user.email);

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
    <SidebarLayout sidebarItems={sidebarItems} sidebarTitle={tCommon('appName')}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{t('subtitle')}</p>
        </div>

        {userOrders.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-12 text-center shadow-sm">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('noOrders')}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start shopping to see your orders here
            </p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-sm"
            >
              {t('startShopping')}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {userOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {t('orderNumber')}{order.orderNumber}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {t(`status_${order.status}`)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t('date')}: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-600 dark:text-gray-400">{t('total')}</div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        {formatPrice(order.total)}
                      </div>
                    </div>
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      {t('viewDetails')}
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
    </SidebarLayout>
  );
}
