import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // If the user is not logged in, redirect to the login page
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If the user is an admin, allow access to all admin routes
  if (pathname.startsWith('/admin') && session.user?.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/profile', '/courses/:path*', '/dashboard/:path*'],
};
