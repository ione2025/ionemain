'use client';

import { SidebarLayout } from '../../../components/Sidebar';
import { useTranslations } from 'next-intl';

export default function SellerAnalyticsPage() {
  const t = useTranslations('landing');

  const sidebarItems = [
    { href: '/seller', label: 'Dashboard', icon: '📊', translationKey: 'dashboard' },
    { href: '/seller/products', label: 'Products', icon: '📦', translationKey: 'products' },
    { href: '/seller/orders', label: 'Orders', icon: '🛒', translationKey: 'orders' },
    { href: '/seller/analytics', label: 'Analytics', icon: '📈', translationKey: 'analytics' },
  ];

  return (
    <SidebarLayout sidebarItems={sidebarItems} sidebarTitle={t('sellerDashboard')}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">View your sales analytics and insights</p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-12 text-center shadow-sm">
          <div className="text-6xl mb-4">📈</div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Coming Soon
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Analytics dashboard will be available soon
          </p>
        </div>
      </div>
    </SidebarLayout>
  );
}
