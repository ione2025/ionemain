'use client';

import { products } from '../../../data/products';
import { ImageGallery } from '../../../components/ImageGallery';
import { useCart } from '../../../components/CartContext';

export default function ProductDetail({ params }: { params: { id: string } }) {
  const { addItem } = useCart();
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

        <button
          onClick={() => addItem(product, 1)}
          className="mt-3 rounded border px-3 py-2 bg-white dark:bg-gray-900 dark:border-gray-700"
        >
          Add to cart
        </button>

        <h2 className="mt-6 font-semibold">Gallery</h2>
        <ImageGallery images={product.images} />

        <h2 className="mt-6 font-semibold">Description</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{product.description}</p>

        {product.specs?.length ? (
          <> 
            <h2 className="mt-6 font-semibold">Specifications</h2>
            <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.specs.map((s, i) => (
                <li
                  key={s.label + i}
                  className="p-2 rounded border dark:border-gray-800 bg-white dark:bg-gray-950"
                >
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {s.label}:
                  </span>{' '}
                  <span className="font-medium">{s.value}</span>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <h2 className="mt-6 font-semibold">Reviews</h2>
        {product.reviews?.length ? (
          <ul className="mt-2 space-y-3">
            {product.reviews.map((r, i) => (
              <li
                key={r.author + i}
                className="p-3 rounded border dark:border-gray-800 bg-white dark:bg-gray-950"
              >
                <div className="font-medium">{r.author}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {r.rating} / 5 • {new Date(r.date).toLocaleDateString()}
                </div>
                <p className="mt-1">{r.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400">No reviews yet.</p>
        )}
      </div>
    </main>
  );
}