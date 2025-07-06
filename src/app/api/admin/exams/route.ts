import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'TEACHER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const exams = await prisma.exam.findMany({
    orderBy: { examDate: 'desc' },
  })
  return NextResponse.json({ exams })
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'TEACHER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { title, subject, maxScore, examDate, grade } = await request.json()
  if (!title || !subject || !maxScore || !examDate || !grade) {
    return NextResponse.json({ error: 'All fields required' }, { status: 400 })
  }
  const exam = await prisma.exam.create({
    data: {
      title,
      subject,
      maxScore: parseInt(maxScore, 10),
      examDate: new Date(examDate),
      grade: parseInt(grade, 10),
    },
  })
  return NextResponse.json({ exam }, { status: 201 })
}
