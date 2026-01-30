'use client';

import { useMemo, useState } from 'react';
import { products } from '../data/products';

export function SellerEditForm({ id }: { id: string }) {
  const existing = useMemo(() => products.find((p) => p.id === id), [id]);
  const [name, setName] = useState(existing?.name ?? '');
  const [price, setPrice] = useState<number>(existing?.price ?? 0);
  const [category, setCategory] =
    useState<'Electronics' | 'Apparel' | 'Home & Garden'>(existing?.category ?? 'Electronics');
  const [desc, setDesc] = useState(existing?.description ?? '');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Mock update:\nName=${name}\nPrice=${price}\nCategory=${category}\nDescription=${desc}`
    );
  };

  if (!existing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 text-center">
            <p className="text-gray-400">Product not found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Edit Product</h1>
          <p className="text-gray-400">Update your product listing</p>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={submit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Product Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Price</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as 'Electronics' | 'Apparel' | 'Home & Garden')
                }
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              >
                <option>Electronics</option>
                <option>Apparel</option>
                <option>Home & Garden</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                rows={4}
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
            >
              Update Product (mock)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
