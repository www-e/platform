'use client'

import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const schema = z.object({
  studentId: z.string().min(3),
  password: z.string().min(6),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    const res = await signIn('credentials', {
      redirect: false,
      studentId: data.studentId,
      password: data.password,
    })
    if (res?.ok) {
      router.push('/profile')
    } else {
      alert('بيانات غير صحيحة')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full bg-white p-8 rounded-lg shadow"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">تسجيل دخول</h2>

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

        <label className="block mb-6">
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
        >
          {isSubmitting ? 'جاري الدخول...' : 'تسجيل دخول'}
        </button>

        <p className="mt-4 text-center text-gray-600">
          لا تملك حساب؟{' '}
          <Link href="/register" className="text-orange-500 hover:underline">
            إنشاء حساب
          </Link>
        </p>
      </form>
    </div>
)
}
