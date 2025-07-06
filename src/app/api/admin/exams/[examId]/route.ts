import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET(request: Request, { params }: { params: { examId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'TEACHER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const exam = await prisma.exam.findUnique({ where: { id: params.examId } })
  if (!exam) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ exam })
}

export async function PATCH(request: Request, { params }: { params: { examId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'TEACHER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { title, subject, maxScore, examDate, grade } = await request.json()
  const updated = await prisma.exam.update({
    where: { id: params.examId },
    data: {
      ...(title && { title }),
      ...(subject && { subject }),
      ...(maxScore && { maxScore: parseInt(maxScore, 10) }),
      ...(examDate && { examDate: new Date(examDate) }),
      ...(grade && { grade: parseInt(grade, 10) }),
    },
  })
  return NextResponse.json({ exam: updated })
}

export async function DELETE(request: Request, { params }: { params: { examId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'TEACHER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  await prisma.exam.delete({ where: { id: params.examId } })
  return NextResponse.json({ success: true })
}
