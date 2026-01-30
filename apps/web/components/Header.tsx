'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { products } from '../data/products';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query]);

  useEffect(() => {
    setOpen(results.length > 0 && query.length > 0);
  }, [results.length, query]);

  return (
    <header className="border-b bg-white dark:bg-gray-950">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4 gap-4">
        <Link href="/" className="font-bold text-xl">
          ionecenter
        </Link>
        <div className="relative flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded border p-2 bg-white dark:bg-gray-900 dark:border-gray-700"
          />
          {open && (
            <div className="absolute z-20 mt-2 w-full rounded border bg-white dark:bg-gray-900 dark:border-gray-700 shadow">
              {results.map((r) => (
                <Link
                  key={r.id}
                  href={`/products/${r.id}`}
                  className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={r.image}
                      alt={r.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div>
                      <div className="font-medium">{r.name}</div>
                      <div className="text-xs text-gray-500">
                        ${r.price.toFixed(2)} • {r.category}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              <button
                className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-400"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/products" className="hover:underline">
            Products
          </Link>
          <Link href="/categories" className="hover:underline">
            Categories
          </Link>
          <Link href="/cart" className="hover:underline">
            Cart
          </Link>
          <Link href="/seller" className="hover:underline">
            Seller
          </Link>
          <ThemeToggle />
          
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg shadow-lg z-30">
                  <div className="px-4 py-3 border-b dark:border-gray-700">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${
                      user.role === 'admin'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        : user.role === 'seller'
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                        : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                  <Link
                    href="/account"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}