'use client';

import { Product } from '../types';
import { useCart } from './CartContext';

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  return (
    <button
      onClick={() => addItem(product, 1)}
      className="mt-3 rounded border px-3 py-2 bg-white dark:bg-gray-900 dark:border-gray-700"
    >
      Add to cart
    </button>
  );
}
