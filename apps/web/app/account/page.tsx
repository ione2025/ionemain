'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function AccountPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
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
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Account</h1>
            <p className="text-gray-400 mt-1">Manage your profile</p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="grid gap-6">
          {/* Profile Card */}
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-xl font-semibold">{user.name}</div>
                <div className="text-gray-400">{user.email}</div>
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                    user.role === 'admin'
                      ? 'bg-red-500/10 text-red-400'
                      : user.role === 'seller'
                      ? 'bg-purple-500/10 text-purple-400'
                      : 'bg-green-500/10 text-green-400'
                  }`}
                >
                  {user.role}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  Save Changes
                </button>
                {saved && (
                  <span className="text-green-400 text-sm">✓ Saved successfully</span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.role === 'seller' && (
                <Link
                  href="/seller"
                  className="flex items-center gap-3 p-4 bg-gray-900/50 rounded-xl hover:bg-gray-700/50 transition-colors"
                >
                  <span className="text-2xl">📦</span>
                  <div>
                    <div className="font-medium">Seller Dashboard</div>
                    <div className="text-sm text-gray-400">Manage your listings</div>
                  </div>
                </Link>
              )}
              {user.role === 'admin' && (
                <Link
                  href="/admin"
                  className="flex items-center gap-3 p-4 bg-gray-900/50 rounded-xl hover:bg-gray-700/50 transition-colors"
                >
                  <span className="text-2xl">⚙️</span>
                  <div>
                    <div className="font-medium">Admin Dashboard</div>
                    <div className="text-sm text-gray-400">Manage platform</div>
                  </div>
                </Link>
              )}
              <Link
                href="/cart"
                className="flex items-center gap-3 p-4 bg-gray-900/50 rounded-xl hover:bg-gray-700/50 transition-colors"
              >
                <span className="text-2xl">🛒</span>
                <div>
                  <div className="font-medium">My Cart</div>
                  <div className="text-sm text-gray-400">View your cart</div>
                </div>
              </Link>
              <Link
                href="/products"
                className="flex items-center gap-3 p-4 bg-gray-900/50 rounded-xl hover:bg-gray-700/50 transition-colors"
              >
                <span className="text-2xl">🔍</span>
                <div>
                  <div className="font-medium">Browse Products</div>
                  <div className="text-sm text-gray-400">Find great deals</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Logout */}
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Session</h2>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 font-medium rounded-xl transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
