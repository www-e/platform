// src/lib/auth.ts

import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import prisma from './prisma'

// 1. Define your NextAuth options (as before)
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'database' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        studentId: { label: 'Student ID', type: 'text' },
        password:   { label: 'Password',   type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.studentId || !credentials.password) {
          throw new Error('Missing credentials')
        }
        const user = await prisma.user.findUnique({
          where: { studentId: credentials.studentId },
        })
        if (!user) throw new Error('Invalid credentials')
        const valid = await bcrypt.compare(credentials.password, user.password)
        if (!valid) throw new Error('Invalid credentials')
        return { id: user.id, name: user.name, studentId: user.studentId, grade: user.grade }
      },
    }),
  ],
  pages: { signIn: '/login', error: '/login' },
  callbacks: {
    session({ session, user }) {
      session.user = {
        ...session.user!,
        id: user.id,
        studentId: (user as any).studentId,
        grade: (user as any).grade,
      }
      return session
    },
  },
}

// 2. Create NextAuth handlers
const nextAuthHandlers = NextAuth(authOptions)

// 3. Export the `auth` middleware helper
export const auth = nextAuthHandlers.auth

// 4. Also export GET/POST handlers for your catch-all API route
export const { GET, POST } = nextAuthHandlers
