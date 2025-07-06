// src/app/admin/courses/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'

type Course = {
  id: string
  title: string
  description: string
  grade: number
  videosCount: number
  enrolledStudents: number
  createdAt: string
}

export default function CoursesManagement() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all')

  useEffect(() => {
    fetchCourses()
  }, [selectedGrade])

  const fetchCourses = async () => {
    const params = selectedGrade !== 'all' ? `?grade=${selectedGrade}` : ''
    const response = await fetch(`/api/admin/courses${params}`)
    const data = await response.json()
    setCourses(data.courses)
    setLoading(false)
  }

  const deleteCourse = async (courseId: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الدورة؟')) {
      await fetch(`/api/admin/courses/${courseId}`, { method: 'DELETE' })
      fetchCourses()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">إدارة الدورات</h1>
        <Link
          href="/admin/courses/new"
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          إضافة دورة جديدة
        </Link>
      </div>

      {/* Filter by Grade */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex gap-4">
          <button
            onClick={() => setSelectedGrade('all')}
            className={`px-4 py-2 rounded-lg transition ${
              selectedGrade === 'all' 
                ? 'bg-orange-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            جميع الصفوف
          </button>
          {[1, 2, 3].map(grade => (
            <button
              key={grade}
              onClick={() => setSelectedGrade(grade)}
              className={`px-4 py-2 rounded-lg transition ${
                selectedGrade === grade 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              الصف {grade}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-900">عنوان الدورة</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-900">الصف</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-900">عدد الفيديوهات</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-900">الطلاب المسجلين</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-900">تاريخ الإنشاء</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-900">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {courses.map(course => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{course.title}</div>
                    <div className="text-sm text-gray-600 mt-1">{course.description}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">الصف {course.grade}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{course.videosCount}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{course.enrolledStudents}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(course.createdAt).toLocaleDateString('ar-EG')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/courses/${course.grade}/${course.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/courses/${course.id}/edit`}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => deleteCourse(course.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
