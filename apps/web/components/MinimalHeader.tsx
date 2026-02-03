'use client';

import Link from 'next/link';
import { LocaleCurrencySelector } from './LocaleCurrencySelector';

export function MinimalHeader() {
  return (
    <header className="border-b bg-white dark:bg-gray-950">
      <nav className="max-w-full mx-auto flex items-center justify-between p-4">
        <Link href="/" className="font-bold text-xl">
          ionecenter
        </Link>
        <div className="flex items-center gap-3">
          <LocaleCurrencySelector />
        </div>
      </nav>
    </header>
  );
}
