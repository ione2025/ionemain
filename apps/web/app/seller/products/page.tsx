'use client';

import Link from 'next/link';
import { products } from '../../../data/products';
import { SidebarLayout } from '../../../components/Sidebar';
import { useTranslations } from 'next-intl';

export default function SellerProductsPage() {
  const t = useTranslations('landing');
  const tSidebar = useTranslations('sidebar');

  const sidebarItems = [
    { href: '/seller', label: 'Dashboard', icon: '📊', translationKey: 'dashboard' },
    { href: '/seller/products', label: 'Products', icon: '📦', translationKey: 'products' },
    { href: '/seller/orders', label: 'Orders', icon: '🛒', translationKey: 'orders' },
    { href: '/seller/analytics', label: 'Analytics', icon: '📈', translationKey: 'analytics' },
  ];

  return (
    <SidebarLayout sidebarItems={sidebarItems} sidebarTitle={t('sellerDashboard')}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Products</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your product listings</p>
          </div>
          <Link
            href="/seller/new"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
          >
            Add Product
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <span className="font-medium text-gray-900 dark:text-white">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-blue-600 dark:text-blue-400 font-semibold">
                      ${p.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{p.category}</td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/seller/${p.id}/edit`}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
