'use client';

import Link from 'next/link';
import { useCart } from '../../components/CartContext';
import { products } from '../../data/products';

export default function CartPage() {
  const { items, updateQty, removeItem, clear, total } = useCart();

  const rows = items
    .map((i) => {
      const p = products.find((p) => p.id === i.productId);
      if (!p) return null;
      return { product: p, qty: i.qty };
    })
    .filter(Boolean) as { product: (typeof products)[number]; qty: number }[];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Cart</h1>
          <p className="text-gray-400">Review and manage your items</p>
        </div>

        {rows.length === 0 ? (
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4" aria-hidden="true">🛒</div>
            <p className="text-gray-400 text-lg mb-6">Your cart is empty.</p>
            <Link
              href="/products"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl mb-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700/50">
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Product</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Price</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Quantity</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Subtotal</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map(({ product, qty }) => (
                      <tr key={product.id} className="border-b border-gray-700/30 hover:bg-gray-700/20">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div>
                              <div className="font-medium text-white">{product.name}</div>
                              <div className="text-sm text-gray-400">{product.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-blue-400 font-semibold">${product.price.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            min={1}
                            value={qty}
                            onChange={(e) =>
                              updateQty(product.id, Math.max(1, Number(e.target.value)))
                            }
                            className="w-20 px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4 text-white font-semibold">
                          ${(product.price * qty).toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => removeItem(product.id)}
                            className="text-red-400 hover:text-red-300 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-2xl font-bold text-white">
                  Total: <span className="text-blue-400">${total.toFixed(2)}</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={clear}
                    className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-all"
                  >
                    Clear Cart
                  </button>
                  <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40">
                    Checkout (mock)
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}