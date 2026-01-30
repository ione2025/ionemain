'use client';

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
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {rows.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">Your cart is empty.</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded border dark:border-gray-800 bg-white dark:bg-gray-950">
            <table className="min-w-full">
              <thead>
                <tr className="text-left">
                  <th className="p-3">Product</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Qty</th>
                  <th className="p-3">Subtotal</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ product, qty }) => (
                  <tr key={product.id} className="border-t dark:border-gray-800">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-gray-500">{product.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">${product.price.toFixed(2)}</td>
                    <td className="p-3">
                      <input
                        type="number"
                        min={1}
                        value={qty}
                        onChange={(e) =>
                          updateQty(product.id, Math.max(1, Number(e.target.value)))
                        }
                        className="w-20 rounded border p-1 bg-white dark:bg-gray-900 dark:border-gray-700"
                      />
                    </td>
                    <td className="p-3">
                      ${(product.price * qty).toFixed(2)}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-blue-600 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-lg font-semibold">Total: ${total.toFixed(2)}</div>
            <div className="flex gap-3">
              <button onClick={clear} className="rounded border px-3 py-2">
                Clear Cart
              </button>
              <button className="rounded border px-3 py-2">Checkout (mock)</button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}