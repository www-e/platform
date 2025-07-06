'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function EditCoursePage() {
  const { courseId } = useParams() as { courseId: string }
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [grade, setGrade] = useState('1')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch(`/api/admin/courses/${courseId}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.course.title)
        setDescription(data.course.description || '')
        setGrade(data.course.grade.toString())
        setLoading(false)
      })
  }, [courseId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const res = await fetch(`/api/admin/courses/${courseId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, grade }),
    })
    if (res.ok) router.push('/admin/courses')
    else alert('Error updating course')
    setSaving(false)
  }

  if (loading) return <div className="p-8 text-center">جارٍ التحميل…</div>

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">تعديل الدورة</h1>
      <label className="block mb-4">
        <span>عنوان الدورة</span>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full mt-1 p-2 border rounded"
          required
        />
      </label>
      <label className="block mb-4">
        <span>الوصف</span>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full mt-1 p-2 border rounded"
          rows={4}
        />
      </label>
      <label className="block mb-6">
        <span>الصف</span>
        <select
          value={grade}
          onChange={e => setGrade(e.target.value)}
          className="w-full mt-1 p-2 border rounded"
        >
          <option value="1">الصف 1</option>
          <option value="2">الصف 2</option>
          <option value="3">الصف 3</option>
        </select>
      </label>
      <button
        type="submit"
        disabled={saving}
        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
      >
        {saving ? 'جاري التحديث…' : 'تحديث الدورة'}
      </button>
    </form>
  )
}
