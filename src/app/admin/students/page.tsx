'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Trash2, Edit, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Student = {
  id: string
  name: string
  studentId: string
  grade: number
  createdAt: string
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/admin/students')
      .then(res => res.json())
      .then(data => {
        setStudents(data.students)
        setLoading(false)
      })
  }, [])

  const deleteStudent = async (sid: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الطالب؟')) {
      await fetch(`/api/admin/students/${sid}`, { method: 'DELETE' })
      setStudents(prev => prev.filter(s => s.studentId !== sid))
    }
  }

  if (loading) return <div className="p-8 text-center">جارٍ التحميل…</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">إدارة الطلاب</h1>
        <button
          onClick={() => router.push('/admin/students/new')}
          className="bg-orange-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-orange-600"
        >
          <Plus className="w-5 h-5" />
          إضافة طالب
        </button>
      </div>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-right">الاسم</th>
              <th className="px-4 py-2 text-right">رقم الطالب</th>
              <th className="px-4 py-2 text-right">الصف</th>
              <th className="px-4 py-2 text-right">تاريخ التسجيل</th>
              <th className="px-4 py-2 text-right">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.studentId} className="hover:bg-gray-50">
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2">{s.studentId}</td>
                <td className="px-4 py-2">الصف {s.grade}</td>
                <td className="px-4 py-2">{new Date(s.createdAt).toLocaleDateString('ar-EG')}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link href={`/admin/students/${s.studentId}/edit`} className="text-green-600 hover:text-green-800">
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button onClick={() => deleteStudent(s.studentId)} className="text-red-600 hover:text-red-800">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
