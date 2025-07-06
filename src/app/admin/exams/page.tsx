'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Plus, Edit, Trash2 } from 'lucide-react'

type Exam = {
  id: string
  title: string
  subject: string
  maxScore: number
  examDate: string
}

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/admin/exams')
      .then(res => res.json())
      .then(data => {
        setExams(data.exams)
        setLoading(false)
      })
  }, [])

  const deleteExam = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الامتحان؟')) {
      await fetch(`/api/admin/exams/${id}`, { method: 'DELETE' })
      setExams(prev => prev.filter(e => e.id !== id))
    }
  }

  if (loading) return <div className="p-8 text-center">جارٍ التحميل…</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">إدارة الامتحانات</h1>
        <button
          onClick={() => router.push('/admin/exams/new')}
          className="bg-orange-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-orange-600"
        >
          <Plus className="w-5 h-5" />
          إنشاء امتحان
        </button>
      </div>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-right">عنوان</th>
              <th className="px-4 py-2 text-right">المادة</th>
              <th className="px-4 py-2 text-right">الحد الأقصى</th>
              <th className="px-4 py-2 text-right">التاريخ</th>
              <th className="px-4 py-2 text-right">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {exams.map(e => (
              <tr key={e.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{e.title}</td>
                <td className="px-4 py-2">{e.subject}</td>
                <td className="px-4 py-2">{e.maxScore}</td>
                <td className="px-4 py-2">{new Date(e.examDate).toLocaleDateString('ar-EG')}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link href={`/admin/exams/${e.id}/edit`} className="text-green-600 hover:text-green-800">
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button onClick={() => deleteExam(e.id)} className="text-red-600 hover:text-red-800">
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
