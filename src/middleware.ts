// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('adminToken')?.value; // Simpler cookie name
    const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'my-secret-token';

    console.log('Token from cookie:', token);
    console.log('ADMIN_TOKEN from env:', ADMIN_TOKEN);

    if (token !== ADMIN_TOKEN) {
      return NextResponse.redirect(new URL('/login', request.url)); // Redirect to a login page
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};