import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ar', 'zh'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Don't use locale prefix in URL
  localePrefix: 'never',

  // Detect locale from cookie
  localeDetection: true,
});

export const config = {
  // Match all pathnames except for
  // - files (e.g. _next/static, favicon.ico)
  // - api routes
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
