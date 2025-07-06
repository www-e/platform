'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewExamPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '', subject: '', maxScore: '', examDate: '', grade: '1'
  })
  const [saving, setSaving] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/admin/exams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) router.push('/admin/exams')
    else alert('Error creating exam')
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">إنشاء امتحان جديد</h1>
      {['title','subject','maxScore','examDate'].map(field => (
        <label key={field} className="block mb-4">
          <span className="block text-gray-700">{field === 'maxScore'? 'الحد الأقصى': field === 'examDate'? 'تاريخ الامتحان': field === 'subject'? 'المادة':'العنوان'}</span>
          <input
            name={field}
            type={field==='examDate'? 'date': field==='maxScore'? 'number':'text'}
            value={(form as any)[field]}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded"
            required
          />
        </label>
      ))}
      <label className="block mb-6">
        <span className="block text-gray-700">الصف</span>
        <select
          name="grade"
          value={form.grade}
          onChange={handleChange}
          className="mt-1 w-full p-2 border rounded"
        >
          {['1','2','3'].map(g => <option key={g} value={g}>الصف {g}</option>)}
        </select>
      </label>
      <button
        type="submit"
        disabled={saving}
        className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
      >
        {saving ? 'جاري الإنشاء…' : 'إنشاء الامتحان'}
      </button>
    </form>
  )
}
