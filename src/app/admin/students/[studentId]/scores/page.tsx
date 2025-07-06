'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

type Exam = { id: string; title: string; maxScore: number }
type Result = { examId: string; score: string; status: string }

export default function StudentScoresPage() {
  const { studentId } = useParams() as { studentId: string }
  const [exams, setExams] = useState<Exam[]>([])
  const [results, setResults] = useState<Result[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // Fetch all exams
    fetch('/api/admin/exams')
      .then(res => res.json())
      .then(data => setExams(data.exams))

    // Fetch existing results
    fetch(`/api/admin/students/${studentId}`)
      .then(res => res.json())
      .then(data => {
        setResults(
          data.student.enrollments.map((en: any) => ({
            examId: en.examId,
            score: en.score?.toString() || '',
            status: en.status || 'absent'
          }))
        )
      })
  }, [studentId])

  const handleChange = (examId: string, field: keyof Result, value: string) => {
    setResults(r =>
      r.map(res => res.examId === examId ? { ...res, [field]: value } : res)
    )
  }

  const handleSubmit = async () => {
    setSaving(true)
    await Promise.all(results.map(r =>
      fetch(`/api/admin/students/${studentId}/scores`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(r)
      })
    ))
    setSaving(false)
    alert('تم حفظ النتائج')
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">إدخال نتائج الطالب</h1>
      <div className="space-y-4">
        {exams.map(exam => {
          const res = results.find(r => r.examId === exam.id) || { examId: exam.id, score:'', status:'absent' }
          return (
            <div key={exam.id} className="flex items-center gap-4">
              <span className="w-48">{exam.title} ({exam.maxScore})</span>
              <input
                type="number"
                min="0"
                max={exam.maxScore}
                placeholder="الدرجة"
                value={res.score}
                onChange={e => handleChange(exam.id,'score', e.target.value)}
                className="w-24 p-1 border rounded"
              />
              <select
                value={res.status}
                onChange={e => handleChange(exam.id,'status', e.target.value)}
                className="p-1 border rounded"
              >
                {['pass','fail','absent'].map(s => (
                  <option key={s} value={s}>{s === 'pass'? 'نجح': s==='fail'? 'رسب':'غائب'}</option>
                ))}
              </select>
            </div>
          )
        })}
      </div>
      <button
        onClick={handleSubmit}
        disabled={saving}
        className="mt-6 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
      >
        {saving? 'جاري الحفظ…':'حفظ النتائج'}
      </button>
    </div>
  )
}
