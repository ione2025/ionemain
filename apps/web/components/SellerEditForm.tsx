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
    return <div>Product not found.</div>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form
        onSubmit={submit}
        className="space-y-3 bg-white dark:bg-gray-950 p-4 border dark:border-gray-800 rounded"
      >
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border p-2 bg-white dark:bg-gray-900 dark:border-gray-700"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Price</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full rounded border p-2 bg-white dark:bg-gray-900 dark:border-gray-700"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Category</label>
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as 'Electronics' | 'Apparel' | 'Home & Garden')
            }
            className="w-full rounded border p-2 bg-white dark:bg-gray-900 dark:border-gray-700"
          >
            <option>Electronics</option>
            <option>Apparel</option>
            <option>Home & Garden</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full rounded border p-2 bg-white dark:bg-gray-900 dark:border-gray-700"
            rows={4}
          />
        </div>
        <button className="rounded border px-3 py-2">Update (mock)</button>
      </form>
    </>
  );
}
