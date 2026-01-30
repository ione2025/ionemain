import { NextRequest, NextResponse } from 'next/server';

// Simple middleware that sets locale from cookie - no redirects
export function middleware(request: NextRequest) {
  const locale = request.cookies.get('NEXT_LOCALE')?.value || 'en';
  const response = NextResponse.next();
  
  // If locale cookie doesn't exist, set default
  if (!request.cookies.has('NEXT_LOCALE')) {
    response.cookies.set('NEXT_LOCALE', locale, { maxAge: 31536000 });
  }
  
  return response;
}

export const config = {
  // Match pathnames that need locale handling - exclude API and static files
  matcher: ['/((?!api|_next|.*\\..*).*)', '/'],
};
