//src/app/admin/courses/new/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewCoursePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [grade, setGrade] = useState('1')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/admin/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, grade }),
    })
    if (res.ok) router.push('/admin/courses')
    else alert('Error creating course')
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">إضافة دورة جديدة</h1>
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
        className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
      >
        {saving ? 'جاري الحفظ…' : 'حفظ الدورة'}
      </button>
    </form>
  )
}
