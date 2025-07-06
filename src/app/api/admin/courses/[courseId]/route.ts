// src/app/api/admin/courses/[courseId]/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET(request: Request, { params }: { params: { courseId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'TEACHER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const course = await prisma.course.findUnique({
    where: { id: params.courseId },
    include: { videos: true, enrollments: true },
  })
  if (!course) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ course })
}

export async function PATCH(request: Request, { params }: { params: { courseId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'TEACHER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await request.json()
  const { title, description, grade } = body
  const updated = await prisma.course.update({
    where: { id: params.courseId },
    data: {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(grade !== undefined && { grade: parseInt(grade, 10) }),
    },
  })
  return NextResponse.json({ course: updated })
}

export async function DELETE(request: Request, { params }: { params: { courseId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'TEACHER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  await prisma.course.delete({ where: { id: params.courseId } })
  return NextResponse.json({ success: true })
}
