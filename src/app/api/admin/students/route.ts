// src/app/api/admin/students/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'TEACHER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const students = await prisma.user.findMany({
    where: { role: 'STUDENT' },
    select: {
      id: true,
      name: true,
      studentId: true,
      grade: true,
      createdAt: true
    },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json({ students })
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'TEACHER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { name, studentId, password, grade } = await request.json()
  if (!name || !studentId || !password || !grade) {
    return NextResponse.json({ error: 'All fields required' }, { status: 400 })
  }
  // Hash via bcryptjs
  const bcrypt = (await import('bcryptjs')).default
  const hashed = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { name, studentId, password: hashed, grade: parseInt(grade, 10), role: 'STUDENT' }
  })
  return NextResponse.json({ student: { id: user.id, name: user.name, studentId: user.studentId, grade: user.grade } }, { status: 201 })
}
