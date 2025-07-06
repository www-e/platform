// src/app/api/admin/students/[studentId]/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET(request: Request, { params }: { params: { studentId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'TEACHER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const user = await prisma.user.findUnique({
    where: { studentId: params.studentId },
    select: { id: true, name: true, studentId: true, grade: true, enrollments: { select: { courseId: true } } }
  })
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ student: user })
}

export async function PATCH(request: Request, { params }: { params: { studentId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'TEACHER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await request.json()
  const data: any = {}
  if (body.name) data.name = body.name
  if (body.grade) data.grade = parseInt(body.grade, 10)
  if (body.password) {
    const bcrypt = (await import('bcryptjs')).default
    data.password = await bcrypt.hash(body.password, 10)
  }
  const updated = await prisma.user.update({
    where: { studentId: params.studentId },
    data
  })
  return NextResponse.json({ student: updated })
}

export async function DELETE(request: Request, { params }: { params: { studentId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'TEACHER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  await prisma.user.delete({ where: { studentId: params.studentId } })
  return NextResponse.json({ success: true })
}
