'use client';

import Link from 'next/link';
import { Product } from '../types';
import { useCart } from './CartContext';

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="group relative bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
        <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
        <p className="text-xl font-bold text-blue-400 mb-1">
          ${product.price.toFixed(2)}
        </p>
        {product.rating && (
          <p className="text-sm text-gray-400 mb-4">⭐ {product.rating} / 5</p>
        )}
        <div className="flex gap-3">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 text-center px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium rounded-lg hover:bg-white/10 transition-all text-sm"
          >
            View details
          </Link>
          <button
            onClick={() => addItem(product, 1)}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all text-sm"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}