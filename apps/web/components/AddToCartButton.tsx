'use client';

import { Product } from '../types';
import { useCart } from './CartContext';

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  return (
    <button
      onClick={() => addItem(product, 1)}
      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
    >
      Add to cart
    </button>
  );
}
