// src/app/api/profile/stats/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ stats: { totalCourses: 0, completedCourses: 0, averageScore: 0, totalExams: 0 } })
  }

  // Get total enrolled courses
  const totalCourses = await prisma.enrollment.count({
    where: { userId: session.user.id }
  })

  // Get exam results for average calculation
  const examResults = await prisma.examResult.findMany({
    where: { userId: session.user.id }
  })

  const averageScore = examResults.length > 0 
    ? Math.round(examResults.reduce((sum, result) => sum + result.percentage, 0) / examResults.length)
    : 0

  const stats = {
    totalCourses,
    completedCourses: 0, // We'll implement this later with course progress tracking
    averageScore,
    totalExams: examResults.length
  }

  return NextResponse.json({ stats })
}
