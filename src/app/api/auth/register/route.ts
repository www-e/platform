// src/app/api/auth/register/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'

// Validate request body
const RegisterSchema = z.object({
  name: z.string().min(2),
  studentId: z.string().min(3),
  password: z.string().min(6),
  grade: z.enum(['1', '2', '3']),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, studentId, password, grade } = RegisterSchema.parse(body)

    // Check for existing student ID
    const existing = await prisma.user.findUnique({ where: { studentId } })
    if (existing) {
      return NextResponse.json({ error: 'Student ID already registered' }, { status: 409 })
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10)

    // Create user record
    await prisma.user.create({
      data: {
        name,
        studentId,
        password: hashed,
        grade: parseInt(grade, 10),
      },
    })

    return NextResponse.json({ message: 'User registered' }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
