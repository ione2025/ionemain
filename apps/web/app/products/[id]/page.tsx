import { products } from '../../../data/products';

export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);
  if (!product) {
    return <div className="max-w-6xl mx-auto p-6">Product not found.</div>;
  }
  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="bg-white p-6 border rounded-lg shadow-sm">
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded" />
        <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
        <p className="text-lg mt-2">${product.price.toFixed(2)}</p>
        {product.rating && <p className="text-sm text-gray-600">Rating: {product.rating} / 5</p>}
        <p className="mt-4 text-gray-700">{product.description}</p>
      </div>
    </main>
  );
}