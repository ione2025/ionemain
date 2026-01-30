'use client';

import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { useCurrency } from '../../../../contexts/CurrencyContext';
import { SidebarLayout } from '../../../../components/Sidebar';
import { useTranslations } from 'next-intl';
import { orders } from '../../../../data/orders';

export default function OrderDetailPage() {
  const { user, isLoading } = useAuth();
  const { formatPrice } = useCurrency();
  const router = useRouter();
  const params = useParams();
  const t = useTranslations('orders');
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

  const order = orders.find((o) => o.id === params.id);

  if (!order) {
    return (
      <SidebarLayout
        sidebarItems={[
          { href: '/account', label: 'Profile', icon: '👤', translationKey: 'profile' },
          { href: '/account/orders', label: 'Orders', icon: '📦', translationKey: 'orders' },
          { href: '/account/addresses', label: 'Addresses', icon: '📍', translationKey: 'addresses' },
          { href: '/account/payments', label: 'Payment Methods', icon: '💳', translationKey: 'payments' },
        ]}
        sidebarTitle={tCommon('appName')}
      >
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Order not found</h1>
            <Link
              href="/account/orders"
              className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Back to orders
            </Link>
          </div>
        </div>
      </SidebarLayout>
    );
  }

  const sidebarItems = [
    { href: '/account', label: 'Profile', icon: '👤', translationKey: 'profile' },
    { href: '/account/orders', label: 'Orders', icon: '📦', translationKey: 'orders' },
    { href: '/account/addresses', label: 'Addresses', icon: '📍', translationKey: 'addresses' },
    { href: '/account/payments', label: 'Payment Methods', icon: '💳', translationKey: 'payments' },
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
    <SidebarLayout sidebarItems={sidebarItems} sidebarTitle={tCommon('appName')}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/account/orders"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-4"
          >
            ← Back to orders
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t('orderDetails')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {t('orderNumber')}{order.orderNumber}
              </p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {t(`status_${order.status}`)}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-800 last:border-0">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">{item.productName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Price: {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {formatPrice(item.total)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {order.shippingAddress && (
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t('shippingAddress')}
                </h2>
                <div className="text-gray-700 dark:text-gray-300">
                  <p>{order.buyerName}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                    {order.shippingAddress.zipCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('orderSummary')}
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>{t('subtotal')}</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>{t('tax')}</span>
                  <span>{formatPrice(order.tax)}</span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>{t('shipping')}</span>
                  <span>{formatPrice(order.shipping)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-800 pt-3 flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                  <span>{t('total')}</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <Link
                href={`/account/orders/${order.id}/invoice`}
                className="block w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-sm"
              >
                {t('viewInvoice')}
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <div>
                  <span className="font-medium">Order Date:</span>{' '}
                  {new Date(order.createdAt).toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Last Updated:</span>{' '}
                  {new Date(order.updatedAt).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
