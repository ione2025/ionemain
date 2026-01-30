import Link from 'next/link';
import { Product } from '../types';

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
      <h3 className="mt-2 font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
      {product.rating && (
        <p className="text-xs text-gray-500">Rating: {product.rating} / 5</p>
      )}
      <Link href={`/products/${product.id}`} className="inline-block mt-2 text-blue-600 hover:underline">
        View details
      </Link>
    </div>
  );
}