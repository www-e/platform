// src/middleware.ts

import { auth } from '@/lib/auth'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Use NextAuth’s built-in middleware function
export const middleware = auth()

export const config = {
  matcher: [
    '/profile',
    '/courses/:path*',
    '/dashboard/:path*',
    // add additional protected routes here
  ],
}
