import { products } from '../../../data/products';
import { ProductCard } from '../../../components/ProductCard';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const decoded = decodeURIComponent(params.slug);
  const filtered = products.filter((p) => p.category === decoded);

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{decoded}</h1>
      {filtered.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}