'use client'
import Image from 'next/image'

const testimonials = [
  { name: 'أحمد', feedback: 'أفضل منصة تعلمت منها الكثير!', avatar: '/avatars/ahmad.jpg' },
  { name: 'سارة', feedback: 'أسلوب شرح مبسط وواضح جداً.', avatar: '/avatars/sara.jpg' },
  { name: 'محمد', feedback: 'أنصح بها لكل طالب!', avatar: '/avatars/mohamed.jpg' },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">آراء طلابنا</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow">
              <Image src={t.avatar} alt={t.name} width={80} height={80} className="rounded-full mx-auto mb-4" />
              <p className="text-gray-600 mb-4">“{t.feedback}”</p>
              <div className="font-semibold text-gray-900">{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
