// src/app/api/profile/courses/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.studentId) {
    return NextResponse.json({ courses: [] })
  }

  // Fetch courses the user is enrolled in
  const enrollments = await prisma.enrollment.findMany({
    where: { user: { studentId: session.user.studentId } },
    include: { course: true },
  })

  const courses = enrollments.map(e => ({
    id: e.course.id,
    title: e.course.title,
    grade: e.course.grade,
  }))

  return NextResponse.json({ courses })
}
