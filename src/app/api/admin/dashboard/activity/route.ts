// src/app/api/admin/dashboard/activity/route.ts
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
    // Get recent activities (simplified version)
    const recentEnrollments = await prisma.enrollment.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true } },
        course: { select: { title: true } }
      }
    })

    const activities = recentEnrollments.map(enrollment => ({
      id: enrollment.id,
      type: 'enrollment' as const,
      message: `تم تسجيل ${enrollment.user.name} في دورة ${enrollment.course.title}`,
      timestamp: enrollment.createdAt.toLocaleDateString('ar-EG'),
      user: enrollment.user.name
    }))

    return NextResponse.json({ activities })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch activity' }, { status: 500 })
  }
}
