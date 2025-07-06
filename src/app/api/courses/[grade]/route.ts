// src/app/api/courses/[grade]/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { grade: string } }) {
  const grade = parseInt(params.grade, 10)
  const courses = await prisma.course.findMany({
    where: { grade },
    select: { id: true, title: true, description: true, grade: true },
  })
  return NextResponse.json({ courses })
}