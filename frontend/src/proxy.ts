import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LANG_COOKIE = 'gc_lang';
const LANG_MAX_AGE = 60 * 60 * 24 * 365;

export function proxy(request: NextRequest) {
  const { searchParams, pathname } = request.nextUrl;
  const response = NextResponse.next();

  const queryLang = searchParams.get('lang');
  if (queryLang === 'en' || queryLang === 'ms') {
    response.cookies.set(LANG_COOKIE, queryLang, {
      maxAge: LANG_MAX_AGE,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }

  response.headers.set('X-Pathname', pathname);
  return response;
}

export const config = {
  matcher: ['/((?!api/|_next/|_vercel|.*\\..*).*)'],
};
