'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Invoice } from '../../../../../components/Invoice';
import { orders } from '../../../../../data/orders';
import { SidebarLayoutWithHeader } from '../../../../../components/Sidebar';
import { useTranslations } from 'next-intl';

export default function SellerInvoicePage() {
  const params = useParams();
  const t = useTranslations('landing');

  const order = orders.find((o) => o.id === params.id);

  const sidebarItems = [
    { href: '/seller', label: 'Dashboard', icon: '📊', translationKey: 'dashboard' },
    { href: '/seller/products', label: 'Products', icon: '📦', translationKey: 'products' },
    { href: '/seller/orders', label: 'Orders', icon: '🛒', translationKey: 'orders' },
    { href: '/seller/analytics', label: 'Analytics', icon: '📈', translationKey: 'analytics' },
  ];

  if (!order) {
    return (
      <SidebarLayoutWithHeader sidebarItems={sidebarItems} sidebarTitle={t('sellerDashboard')}>
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Order not found</h1>
          <Link
            href="/seller/orders"
            className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to orders
          </Link>
        </div>
      </SidebarLayoutWithHeader>
    );
  }

  return (
    <SidebarLayoutWithHeader sidebarItems={sidebarItems} sidebarTitle={t('sellerDashboard')}>
      <div className="py-8 px-4">
        <div className="no-print mb-4">
          <Link
            href={`/seller/orders/${order.id}`}
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
