'use client';

import Link from 'next/link';
import { Product } from '../types';
import { useCart } from './CartContext';

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-950 dark:border-gray-800 shadow-sm">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="mt-2 font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        ${product.price.toFixed(2)}
      </p>
      {product.rating && (
        <p className="text-xs text-gray-500">Rating: {product.rating} / 5</p>
      )}
      <div className="flex gap-3 mt-2">
        <Link
          href={`/products/${product.id}`}
          className="inline-block text-blue-600 hover:underline"
        >
          View details
        </Link>
        <button
          onClick={() => addItem(product, 1)}
          className="text-blue-600 hover:underline"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}