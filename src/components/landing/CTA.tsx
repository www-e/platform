// src/components/landing/CTA.tsx
'use client'
import Link from 'next/link'

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">جاهز للانطلاق؟</h2>
      <p className="mb-8">انضم إلينا الآن وابدأ رحلة التفوق مع أفضل المعلمين</p>
      <Link
        href="/register"
        className="inline-block bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
      >
        سجل الآن
      </Link>
    </section>
  )
}
