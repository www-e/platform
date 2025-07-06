import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { grade: string; courseId: string } }
) {
  const { grade, courseId } = params
  const gradeNum = parseInt(grade, 10)

  // Fetch course with its videos ordered by `order`
  const course = await prisma.course.findFirst({
    where: { id: courseId, grade: gradeNum },
    select: {
      id: true,
      title: true,
      description: true,
      videos: {
        orderBy: { order: 'asc' },
        select: { id: true, title: true, bunnyVideoId: true },
      },
    },
  })

  if (!course) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({ course })
}
