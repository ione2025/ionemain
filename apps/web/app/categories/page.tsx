import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { products } from '../../data/products';

export default async function CategoriesPage() {
  const t = await getTranslations('categories');
  const categories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean))
  ) as string[];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
          <p className="text-gray-400">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((c) => (
            <Link
              key={c}
              href={`/categories/${encodeURIComponent(c)}`}
              className="group relative bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <h2 className="text-xl font-semibold text-white">{c}</h2>
                <div className="mt-4 text-purple-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                  {t('viewProducts')} →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}