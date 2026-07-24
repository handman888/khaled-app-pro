import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_PASSWORD_COOKIE = 'admin_auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (but not /admin/login)
  if (pathname.includes('/admin') && !pathname.includes('/admin/login')) {
    // Check if already authenticated via cookie
    const authCookie = request.cookies.get(ADMIN_PASSWORD_COOKIE);
    if (authCookie?.value === 'true') {
      return NextResponse.next();
    }

    // Check for password submission (POST with password field)
    if (request.method === 'POST') {
      const contentType = request.headers.get('content-type') || '';
      if (contentType.includes('application/x-www-form-urlencoded')) {
        // We'll handle form submission client-side via API route instead
      }
    }

    // Check for password in query string (one-time set)
    const password = request.nextUrl.searchParams.get('password');
    if (password && ADMIN_PASSWORD && password === ADMIN_PASSWORD) {
      const response = NextResponse.redirect(new URL(pathname, request.url));
      response.cookies.set(ADMIN_PASSWORD_COOKIE, 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
      });
      return response;
    }

    // Not authenticated – redirect to a password prompt page
    const loginUrl = new URL(`/${extractLocale(pathname)}/admin/login`, request.url);
    loginUrl.searchParams.set('returnTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

function extractLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] === 'ar' || segments[0] === 'en') return segments[0];
  return 'en';
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
