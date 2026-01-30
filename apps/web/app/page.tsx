import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg bg-white shadow-sm">
          <h2 className="font-semibold">Search Products</h2>
          <p className="text-sm text-gray-600">Browse categories and find items.</p>
          <Link href="/products" className="inline-block mt-2 text-blue-600 hover:underline">Go to Products</Link>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow-sm">
          <h2 className="font-semibold">Seller Dashboard</h2>
          <p className="text-sm text-gray-600">Manage listings and orders.</p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow-sm">
          <h2 className="font-semibold">Messaging</h2>
          <p className="text-sm text-gray-600">Communicate with buyers/sellers.</p>
        </div>
      </div>
    </main>
  );
}