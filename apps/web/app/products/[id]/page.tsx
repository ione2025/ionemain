import { products } from '../../../data/products';
import { ImageGallery } from '../../../components/ImageGallery';
import { AddToCartButton } from '../../../components/AddToCartButton';

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 text-center">
            <p className="text-gray-400">Product not found.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-3xl font-bold text-blue-400 mb-4">${product.price.toFixed(2)}</p>
              {product.rating && (
                <p className="text-lg text-gray-400 mb-6">
                  ⭐ {product.rating} / 5
                </p>
              )}

              <AddToCartButton product={product} />

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-300 leading-relaxed">{product.description}</p>
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="mt-8 pt-8 border-t border-gray-700/50">
            <h2 className="text-xl font-semibold mb-4">Gallery</h2>
            <ImageGallery images={product.images} />
          </div>
        </div>
      </div>
    </main>
  );
}
