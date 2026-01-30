export default function CategoriesPage() {
  const categories = ['Electronics', 'Apparel', 'Home & Garden'];
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map(c => (
          <li key={c} className="p-4 bg-white border rounded shadow-sm">{c}</li>
        ))}
      </ul>
    </main>
  );
}