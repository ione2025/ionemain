'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { SidebarLayout } from '../../components/Sidebar';
import { useTranslations } from 'next-intl';

export default function AccountPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const t = useTranslations('account');
  const tCommon = useTranslations('common');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSave = () => {
    if (!user) return;
    
    try {
      const usersRaw = localStorage.getItem('ionecenter_users');
      const users = usersRaw ? JSON.parse(usersRaw) : [];
      const updatedUsers = users.map((u: { id: string; password: string }) =>
        u.id === user.id ? { ...u, name, email } : u
      );
      localStorage.setItem('ionecenter_users', JSON.stringify(updatedUsers));
      
      const updatedUser = { ...user, name, email };
      localStorage.setItem('ionecenter_auth', JSON.stringify(updatedUser));
      
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // Ignore errors
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

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
    <SidebarLayout sidebarItems={sidebarItems} sidebarTitle={t('title')}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{t('subtitle')}</p>
        </div>

        <div className="grid gap-6">
          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-xl font-semibold text-gray-900 dark:text-white">{user.name}</div>
                <div className="text-gray-600 dark:text-gray-400">{user.email}</div>
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                    user.role === 'admin'
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      : user.role === 'seller'
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                      : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  }`}
                >
                  {user.role}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-sm"
                >
                  {tCommon('save')}
                </button>
                {saved && (
                  <span className="text-green-600 dark:text-green-400 text-sm">{tCommon('saved')}</span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('quickLinks')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.role === 'seller' && (
                <Link
                  href="/seller"
                  className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-2xl">📦</span>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Seller Dashboard</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Manage your listings</div>
                  </div>
                </Link>
              )}
              {user.role === 'admin' && (
                <Link
                  href="/admin"
                  className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-2xl">⚙️</span>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Admin Dashboard</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{t('managePlatform')}</div>
                  </div>
                </Link>
              )}
              <Link
                href="/cart"
                className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-2xl">🛒</span>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{t('myCart')}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('viewYourCart')}</div>
                </div>
              </Link>
              <Link
                href="/products"
                className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-2xl">🔍</span>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{t('browseProducts')}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('findGreatDeals')}</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Logout */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('session')}</h2>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 font-medium rounded-xl transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
