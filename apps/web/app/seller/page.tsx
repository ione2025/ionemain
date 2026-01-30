'use client';

import Link from 'next/link';
import { products } from '../../data/products';

export default function SellerDashboard() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Seller Dashboard</h1>
            <p className="text-gray-400">Manage your product listings</p>
          </div>
          <Link
            href="/seller/new"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
          >
            Add Product
          </Link>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-gray-700/30 hover:bg-gray-700/20">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <span className="font-medium text-white">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-blue-400 font-semibold">${p.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-gray-300">{p.category}</td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/seller/${p.id}/edit`}
                        className="text-blue-400 hover:text-blue-300 font-medium"
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
    </main>
  );
}