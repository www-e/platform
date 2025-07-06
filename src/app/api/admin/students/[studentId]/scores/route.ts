import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'

const ScoreSchema = z.object({
  examId: z.string(),
  score: z.string(),
  status: z.enum(['pass','fail','absent']),
})

export async function POST(request: Request, { params }: { params: { studentId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'TEACHER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const studentId = params.studentId
  const body = await request.json()
  const { examId, score, status } = ScoreSchema.parse(body)

  const percentage = Math.round((parseInt(score,10) / (await prisma.exam.findUnique({where:{id:examId}}))!.maxScore) * 100)

  // Upsert exam result
  await prisma.examResult.upsert({
    where: { userId_examId: { userId: studentId, examId } },
    update: { score: parseInt(score,10), percentage, status },
    create: { userId: studentId, examId, score: parseInt(score,10), percentage, status }
  })

  return NextResponse.json({ success: true })
}
