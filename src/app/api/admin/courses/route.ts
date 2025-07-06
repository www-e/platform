// src/app/api/admin/courses/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'TEACHER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { searchParams } = new URL(request.url)
  const gradeFilter = searchParams.get('grade')
  const where = gradeFilter ? { grade: parseInt(gradeFilter, 10) } : {}
  const courses = await prisma.course.findMany({
    where,
    include: {
      videos: true,
      enrollments: true,
    },
    orderBy: { createdAt: 'desc' },
  })
  const result = courses.map(c => ({
    id: c.id,
    title: c.title,
    description: c.description,
    grade: c.grade,
    videosCount: c.videos.length,
    enrolledStudents: c.enrollments.length,
    createdAt: c.createdAt.toISOString(),
  }))
  return NextResponse.json({ courses: result })
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'TEACHER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await request.json()
  const { title, description, grade } = body
  if (!title || !grade) {
    return NextResponse.json({ error: 'Title and grade required' }, { status: 400 })
  }
  const course = await prisma.course.create({
    data: { title, description, grade: parseInt(grade, 10) },
  })
  return NextResponse.json({ course }, { status: 201 })
}
