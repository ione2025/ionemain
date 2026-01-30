import Link from 'next/link';
import { products } from '../../data/products';

export default function CategoriesPage() {
  const categories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean))
  ) as string[];

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((c) => (
          <li
            key={c}
            className="p-4 bg-white dark:bg-gray-950 border dark:border-gray-800 rounded shadow-sm"
          >
            <Link href={`/categories/${encodeURIComponent(c)}`} className="font-semibold">
              {c}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}