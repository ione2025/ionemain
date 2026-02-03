'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { ReactNode } from 'react';

export function ConditionalHeader() {
  const pathname = usePathname();
  
  // Don't show header on authenticated pages with sidebar
  const hideHeader = pathname.startsWith('/account') || pathname.startsWith('/seller');
  
  if (hideHeader) {
    return null;
  }
  
  return <Header />;
}

type ConditionalFooterProps = {
  children: ReactNode;
};

export function ConditionalFooter({ children }: ConditionalFooterProps) {
  const pathname = usePathname();
  
  // Don't show footer on authenticated pages with sidebar
  const hideFooter = pathname.startsWith('/account') || pathname.startsWith('/seller');
  
  if (hideFooter) {
    return <>{children}</>;
  }
  
  return (
    <>
      {children}
      <footer className="border-t bg-white dark:bg-gray-950 mt-16">
        <div className="max-w-6xl mx-auto p-4 text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} ionecenter
        </div>
      </footer>
    </>
  );
}
