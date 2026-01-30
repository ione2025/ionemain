import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-20" />
        
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-gray-300">B2B Marketplace Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Everything you need for{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                modern commerce
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Connect with buyers and sellers worldwide. A powerful platform for discovering products, 
              managing listings, and growing your business.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
              >
                Get Started Free →
              </Link>
              <Link
                href="/products"
                className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Bento Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for modern businesses
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to buy and sell products efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature Card 1 */}
          <Link
            href="/products"
            className="group relative bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center text-3xl mb-6">
                🔍
              </div>
              <h3 className="text-xl font-semibold mb-3">Search Products</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Browse through thousands of products across multiple categories. 
                Find exactly what you need with powerful search and filters.
              </p>
              <div className="mt-6 text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                Explore Products →
              </div>
            </div>
          </Link>

          {/* Feature Card 2 */}
          <Link
            href="/seller"
            className="group relative bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center text-3xl mb-6">
                📦
              </div>
              <h3 className="text-xl font-semibold mb-3">Seller Dashboard</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Manage your product listings, track orders, and grow your business. 
                Everything you need to succeed as a seller.
              </p>
              <div className="mt-6 text-purple-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                Start Selling →
              </div>
            </div>
          </Link>

          {/* Feature Card 3 */}
          <Link
            href="/categories"
            className="group relative bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:border-pink-500/50 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-14 h-14 bg-pink-500/10 rounded-xl flex items-center justify-center text-3xl mb-6">
                📁
              </div>
              <h3 className="text-xl font-semibold mb-3">Categories</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Explore products by category. From electronics to apparel, 
                find the right products organized just for you.
              </p>
              <div className="mt-6 text-pink-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                View Categories →
              </div>
            </div>
          </Link>

          {/* Feature Card 4 - Wide */}
          <div className="md:col-span-2 relative bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center text-3xl mb-6">
                  💬
                </div>
                <h3 className="text-xl font-semibold mb-3">Messaging</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Connect directly with buyers and sellers. Negotiate deals, 
                  ask questions, and build lasting business relationships.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs font-medium rounded-full">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                  Coming Soon
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-24 h-16 bg-gray-700/50 rounded-lg" />
                  <div className="w-24 h-16 bg-gray-700/50 rounded-lg" />
                  <div className="w-24 h-16 bg-gray-700/50 rounded-lg" />
                  <div className="w-24 h-16 bg-gray-700/50 rounded-lg" />
                </div>
              </div>
            </div>
          </div>

          {/* Feature Card 5 */}
          <Link
            href="/cart"
            className="group relative bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:border-orange-500/50 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center text-3xl mb-6">
                🛒
              </div>
              <h3 className="text-xl font-semibold mb-3">Shopping Cart</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Add products to your cart and checkout when ready. 
                Secure and seamless shopping experience.
              </p>
              <div className="mt-6 text-orange-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                View Cart →
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="relative bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-5" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to get started?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Join thousands of businesses already using ionecenter to connect, trade, and grow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all"
              >
                Create Free Account
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 text-white font-semibold hover:text-gray-300 transition-all"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}