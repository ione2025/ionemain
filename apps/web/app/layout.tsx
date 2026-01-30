import './globals.css';
import type { ReactNode } from 'react';
import { Header } from '../components/Header';
import { CartProvider } from '../components/CartContext';
import { AuthProvider } from '../contexts/AuthContext';

export const metadata = {
  title: 'ionecenter',
  description: 'B2B marketplace MVP',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <AuthProvider>
          <CartProvider>
            <Header />
            {children}
            <footer className="border-t bg-white dark:bg-gray-950 mt-16">
              <div className="max-w-6xl mx-auto p-4 text-sm text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} ionecenter
              </div>
            </footer>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}