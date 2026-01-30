import './globals.css';
import type { ReactNode } from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'ionecenter',
  description: 'B2B marketplace MVP',
};

function Navbar() {
  return (
    <header className="border-b bg-white">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="font-bold text-xl">ionecenter</Link>
        <div className="flex gap-4 text-sm">
          <Link href="/products" className="hover:underline">Products</Link>
          <Link href="/categories" className="hover:underline">Categories</Link>
          <Link href="/cart" className="hover:underline">Cart</Link>
        </div>
      </nav>
    </header>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        {children}
        <footer className="border-t bg-white mt-16">
          <div className="max-w-6xl mx-auto p-4 text-sm text-gray-600">© {new Date().getFullYear()} ionecenter</div>
        </footer>
      </body>
    </html>
  );
}