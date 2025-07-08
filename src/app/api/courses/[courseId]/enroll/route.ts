// src/app/api/courses/[courseId]/enroll/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request, { params }: { params: { courseId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { courseId } = params;
  const userId = session.user.id;

  // Check if the user is already enrolled
  const existingEnrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
  });

  if (existingEnrollment) {
    return NextResponse.json({ error: 'Already enrolled' }, { status: 400 });
  }

  // Create the enrollment
  await prisma.enrollment.create({
    data: {
      userId,
      courseId,
    },
  });

  return NextResponse.json({ message: 'Enrolled successfully' });
}
