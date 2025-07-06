// src/app/courses/[grade]/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Course = {
  id: string
  title: string
  description: string
  grade: number
}

export default function GradeCoursesPage({ params }: { params: { grade: string } }) {
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const grade = parseInt(params.grade, 10)

  useEffect(() => {
    fetch(`/api/courses/${grade}`)
      .then(res => res.json())
      .then(data => setCourses(data.courses))
  }, [grade])

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">دورات الصف {grade}</h1>
      {courses.length ? (
        <ul className="grid md:grid-cols-2 gap-6">
          {courses.map(course => (
            <li key={course.id}>
              <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
                <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <button
                  onClick={() => router.push(`/courses/${grade}/${course.id}`)}
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                >
                  تصفح الدورة
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>لا توجد دورات لهذا الصف حالياً.</p>
      )}
    </div>
  )
}
