import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export const locales = ['en', 'ar', 'zh'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  zh: '中文',
};

export const defaultLocale: Locale = 'en';

// RTL languages
export const rtlLocales: Locale[] = ['ar'];

export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export default getRequestConfig(async () => {
  // Read locale from cookies with error handling
  let locale: Locale = defaultLocale;
  
  try {
    const cookieStore = await cookies();
    const localeCookie = cookieStore.get('NEXT_LOCALE')?.value as Locale | undefined;
    
    // Validate and use cookie locale, fallback to default
    if (localeCookie && locales.includes(localeCookie)) {
      locale = localeCookie;
    }
  } catch (error) {
    // Fallback to default locale if cookie reading fails
    console.warn('Failed to read locale from cookies, using default:', error);
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
