'use client';

import Link from 'next/link';
import { products } from '../../data/products';

export default function SellerDashboard() {
  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Seller Dashboard</h1>
        <Link
          href="/seller/new"
          className="rounded border px-3 py-2 bg-white dark:bg-gray-900 dark:border-gray-700"
        >
          Add Product
        </Link>
      </div>

      <div className="overflow-x-auto rounded border dark:border-gray-800 bg-white dark:bg-gray-950">
        <table className="min-w-full">
          <thead>
            <tr className="text-left">
              <th className="p-3">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3">Category</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t dark:border-gray-800">
                <td className="p-3">{p.name}</td>
                <td className="p-3">${p.price.toFixed(2)}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">
                  <Link
                    href={`/seller/${p.id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}