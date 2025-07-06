'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


const schema = z.object({
  name: z.string().min(2),
  studentId: z.string().min(3),
  password: z.string().min(6),
  grade: z.enum(['1', '2', '3']),
})

type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post('/api/auth/register', data)
      router.push('/login')
    } catch (e) {
      console.error(e)
      alert('فشل التسجيل')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full bg-white p-8 rounded-lg shadow"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">إنشاء حساب</h2>

        <label className="block mb-4">
          <span className="text-gray-700">الاسم الكامل</span>
          <input
            {...register('name')}
            className="mt-1 w-full p-2 border rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">رقم الطالب</span>
          <input
            {...register('studentId')}
            className="mt-1 w-full p-2 border rounded"
          />
          {errors.studentId && (
            <p className="text-red-500 text-sm">{errors.studentId.message}</p>
          )}
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">كلمة المرور</span>
          <input
            type="password"
            {...register('password')}
            className="mt-1 w-full p-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </label>

        <label className="block mb-6">
          <span className="text-gray-700">الصف</span>
          <select
            {...register('grade')}
            className="mt-1 w-full p-2 border rounded"
          >
            <option value="">اختر الصف</option>
            <option value="1">الصف الأول</option>
            <option value="2">الصف الثاني</option>
            <option value="3">الصف الثالث</option>
          </select>
          {errors.grade && (
            <p className="text-red-500 text-sm">{errors.grade.message}</p>
          )}
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
        >
          {isSubmitting ? 'جاري الإنشاء...' : 'إنشاء حساب'}
        </button>

        <p className="mt-4 text-center text-gray-600">
          لديك حساب؟{' '}
          <Link href="/login" className="text-orange-500 hover:underline">
            تسجيل دخول
          </Link>
        </p>
      </form>
    </div>
)
}
