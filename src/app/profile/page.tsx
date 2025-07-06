// src/app/profile/page.tsx
'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import prisma from '@/lib/prisma'

type Course = {
  id: string
  title: string
  grade: number
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [courses, setCourses] = useState<Course[]>([])
  const loading = status === 'loading'

  // Fetch enrolled courses once session is available
  useEffect(() => {
    if (session?.user?.studentId) {
      fetch(`/api/profile/courses`)
        .then(res => res.json())
        .then(data => setCourses(data.courses))
    }
  }, [session])

  if (loading) {
    return <div className="p-8 text-center">جارٍ التحميل…</div>
  }

  if (!session) {
    return <div className="p-8 text-center">يرجى تسجيل الدخول لعرض الملف الشخصي.</div>
  }

  const { name, studentId, grade } = session.user as any

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">مرحباً، {name}</h1>
      <p className="mb-2"><strong>رقم الطالب:</strong> {studentId}</p>
      <p className="mb-6"><strong>الصف:</strong> {grade}</p>

      <h2 className="text-2xl font-semibold mb-4">الدورات المسجلة</h2>
      {courses.length ? (
        <ul className="space-y-4">
          {courses.map(course => (
            <li key={course.id} className="p-4 bg-white rounded shadow">
              <h3 className="text-xl font-bold">{course.title}</h3>
              <p>الصف: {course.grade}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>لم يتم تسجيل أي دورة بعد.</p>
      )}
    </div>
  )
}
