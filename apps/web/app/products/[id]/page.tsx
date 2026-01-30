import { products } from '../../../data/products';
import { ImageGallery } from '../../../components/ImageGallery';
import { AddToCartButton } from '../../../components/AddToCartButton';

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) {
    return <div className="max-w-6xl mx-auto p-6">Product not found.</div>;
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-950 p-6 border dark:border-gray-800 rounded-lg shadow-sm">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded"
        />
        <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
        <p className="text-lg mt-2">${product.price.toFixed(2)}</p>
        {product.rating && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Rating: {product.rating} / 5
          </p>
        )}

        <AddToCartButton product={product} />

        <h2 className="mt-6 font-semibold">Gallery</h2>
        <ImageGallery images={product.images} />

        <h2 className="mt-6 font-semibold">Description</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{product.description}</p>
      </div>
    </main>
  );
}
