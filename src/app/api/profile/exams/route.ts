// src/app/api/profile/exams/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ examResults: [] })
  }

  const examResults = await prisma.examResult.findMany({
    where: { userId: session.user.id },
    include: {
      exam: {
        select: {
          title: true,
          subject: true,
          examDate: true,
          maxScore: true
        }
      }
    },
    orderBy: { exam: { examDate: 'desc' } }
  })

  return NextResponse.json({ examResults })
}
