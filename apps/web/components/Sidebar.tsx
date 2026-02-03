'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useLocale } from '../contexts/LocaleContext';
import { ReactNode } from 'react';
import { MinimalHeader } from './MinimalHeader';

export type SidebarItem = {
  href: string;
  label: string;
  icon: string;
  translationKey?: string;
};

type SidebarProps = {
  items: SidebarItem[];
  title?: string;
};

export function Sidebar({ items, title }: SidebarProps) {
  const pathname = usePathname();
  const { isRTL } = useLocale();
  const t = useTranslations('sidebar');

  return (
    <div className={`w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-800 ${isRTL ? 'border-l' : 'border-r'}`}>
      {title && (
        <div className="p-6 border-b dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
        </div>
      )}
      <nav className="p-4 space-y-2">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              } ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <span className="text-xl" aria-hidden="true">{item.icon}</span>
              <span className="font-medium">
                {item.translationKey ? t(item.translationKey) : item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

type SidebarLayoutProps = {
  children: ReactNode;
  sidebarItems: SidebarItem[];
  sidebarTitle?: string;
};

export function SidebarLayout({ children, sidebarItems, sidebarTitle }: SidebarLayoutProps) {
  const { isRTL } = useLocale();

  return (
    <div className={`flex min-h-screen ${isRTL ? 'flex-row-reverse' : ''}`}>
      <Sidebar items={sidebarItems} title={sidebarTitle} />
      <div className="flex-1 bg-gray-50 dark:bg-gray-950">
        {children}
      </div>
    </div>
  );
}

type SidebarLayoutWithHeaderProps = {
  children: ReactNode;
  sidebarItems: SidebarItem[];
  sidebarTitle?: string;
};

export function SidebarLayoutWithHeader({ children, sidebarItems, sidebarTitle }: SidebarLayoutWithHeaderProps) {
  const { isRTL } = useLocale();

  return (
    <>
      <MinimalHeader />
      <div className={`flex min-h-screen ${isRTL ? 'flex-row-reverse' : ''}`}>
        <Sidebar items={sidebarItems} title={sidebarTitle} />
        <div className="flex-1 bg-gray-50 dark:bg-gray-950">
          {children}
        </div>
      </div>
    </>
  );
}
