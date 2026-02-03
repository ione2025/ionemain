'use client';

import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../../../../../contexts/AuthContext';
import { Invoice } from '../../../../../components/Invoice';
import { useTranslations } from 'next-intl';
import { orders } from '../../../../../data/orders';
import { SidebarLayoutWithHeader } from '../../../../../components/Sidebar';

export default function InvoicePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
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

  const sidebarItems = [
    { href: '/account', label: 'Profile', icon: '👤', translationKey: 'profile' },
    { href: '/account/orders', label: 'Orders', icon: '📦', translationKey: 'orders' },
    { href: '/account/addresses', label: 'Addresses', icon: '📍', translationKey: 'addresses' },
    { href: '/account/payments', label: 'Payment Methods', icon: '💳', translationKey: 'payments' },
  ];

  if (!order) {
    return (
      <SidebarLayoutWithHeader sidebarItems={sidebarItems} sidebarTitle={tCommon('appName')}>
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Order not found</h1>
          <Link
            href="/account/orders"
            className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to orders
          </Link>
        </div>
      </SidebarLayoutWithHeader>
    );
  }

  return (
    <SidebarLayoutWithHeader sidebarItems={sidebarItems} sidebarTitle={tCommon('appName')}>
      <div className="py-8 px-4">
        <div className="no-print mb-4">
          <Link
            href={`/account/orders/${order.id}`}
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to order details
          </Link>
        </div>
        <Invoice order={order} />
      </div>
    </SidebarLayoutWithHeader>
  );
}
