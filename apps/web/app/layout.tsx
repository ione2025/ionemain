import './globals.css';
import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Header } from '../components/Header';
import { CartProvider } from '../components/CartContext';
import { AuthProvider } from '../contexts/AuthContext';
import { LocaleProvider } from '../contexts/LocaleContext';
import { CurrencyProvider } from '../contexts/CurrencyContext';

export const metadata = {
  title: 'ionecenter',
  description: 'B2B marketplace MVP',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();
  const isRTL = locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <LocaleProvider>
            <CurrencyProvider>
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
            </CurrencyProvider>
          </LocaleProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}