'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { products } from '../data/products';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

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
        </div>
      </nav>
    </header>
}