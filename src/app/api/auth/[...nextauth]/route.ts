// src/app/api/auth/[...nextauth]/route.ts
import { authOptions } from '@/lib/auth'
import NextAuth from 'next-auth'

export const { GET, POST } = NextAuth(authOptions)
