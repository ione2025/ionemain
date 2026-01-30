'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Locale = 'en' | 'ar' | 'zh';

export const locales: Locale[] = ['en', 'ar', 'zh'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  zh: '中文',
};

export const rtlLocales: Locale[] = ['ar'];

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isRTL: boolean;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const LOCALE_KEY = 'NEXT_LOCALE';

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    // Check cookie first, then localStorage
    const cookieLocale = document.cookie
      .split('; ')
      .find((row) => row.startsWith('NEXT_LOCALE='))
      ?.split('=')[1] as Locale | undefined;
    
    if (cookieLocale && locales.includes(cookieLocale)) {
      setLocaleState(cookieLocale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    // Set cookie for server-side reading
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    // Reload to apply new locale
    window.location.reload();
  };

  const isRTL = rtlLocales.includes(locale);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, isRTL }}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
};
