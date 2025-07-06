// src/app/api/admin/dashboard/stats/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session || (session.user.role !== 'TEACHER' && session.user.role !== 'ADMIN')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Get stats from database
    const [
      totalStudents,
      totalCourses,
      totalExams,
      examResults,
      newEnrollmentsThisWeek,
      activeStudentsToday
    ] = await Promise.all([
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.course.count(),
      prisma.exam.count(),
      prisma.examResult.findMany({ select: { percentage: true } }),
      prisma.enrollment.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
          }
        }
      }),
      prisma.user.count({
        where: {
          role: 'STUDENT',
          updatedAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
          }
        }
      })
    ])

    const averageGrade = examResults.length > 0
      ? Math.round(examResults.reduce((sum, result) => sum + result.percentage, 0) / examResults.length)
      : 0

    const stats = {
      totalStudents,
      totalCourses,
      totalExams,
      averageGrade,
      newEnrollmentsThisWeek,
      activeStudentsToday
    }

    return NextResponse.json({ stats })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
