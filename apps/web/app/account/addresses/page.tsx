'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { SidebarLayoutWithHeader } from '../../../components/Sidebar';
import { useTranslations } from 'next-intl';

export default function AddressesPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
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

  return (
    <SidebarLayoutWithHeader sidebarItems={sidebarItems} sidebarTitle={tCommon('appName')}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Addresses</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your shipping addresses</p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-12 text-center shadow-sm">
          <div className="text-6xl mb-4">📍</div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Coming Soon
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Address management will be available soon
          </p>
        </div>
      </div>
    </SidebarLayoutWithHeader>
  );
}
