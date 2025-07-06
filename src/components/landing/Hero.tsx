// src/components/landing/Hero.tsx - Modern Hero Section
'use client'

import { useState } from 'react'
import { ChevronRightIcon, PlayIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="container mx-auto px-6 pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Grade Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 text-sm font-medium px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              لطلاب الصفوف 1، 2، 3
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              تعلم وتفوق مع
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                {' '}أفضل{' '}
              </span>
              المعلمين
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              منصة تعليمية حديثة تقدم دروس تفاعلية عالية الجودة لجميع المواد الدراسية مع متابعة شخصية لكل طالب
            </p>

            {/* Stats */}
            <div className="flex gap-8 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-gray-600">طالب متفوق</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <div className="text-gray-600">درس تفاعلي</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-gray-600">نسبة النجاح</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register" passHref>
                <button className="group bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <span className="flex items-center justify-center gap-2">
                    ابدأ التعلم الآن
                    <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>

              <button
                onClick={() => setShowVideo(true)}
                className="group bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-orange-300 transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  <PlayIcon className="w-5 h-5 text-orange-500" />
                  شاهد كيف نعمل
                </span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full border-2 border-white" />
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">انضم إلى 500+ طالب</span> حققوا نتائج ممتازة
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500">
              {/* Video Thumbnail */}
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-blue-100 relative">
                <Image
                  src="/api/placeholder/600/400"
                  alt="منصة التعلم"
                  fill
                  className="object-cover"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setShowVideo(true)}
                    className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                  >
                    <PlayIcon className="w-8 h-8 text-orange-500 ml-1" />
                  </button>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">مباشر الآن</span>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
                  <div className="text-sm">
                    <div className="font-bold text-gray-900">رياضيات - الصف الثاني</div>
                    <div className="text-gray-600">15 طالب مشترك</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-6 -left-6 bg-white rounded-xl p-4 shadow-lg border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  📚
                </div>
                <div>
                  <div className="font-semibold text-gray-900">جميع المواد</div>
                  <div className="text-sm text-gray-600">رياضيات، علوم، لغة</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  ⭐
                </div>
                <div>
                  <div className="font-semibold text-gray-900">تقييم 4.9</div>
                  <div className="text-sm text-gray-600">من 200+ ولي أمر</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold">جولة في المنصة</h3>
              <button
                onClick={() => setShowVideo(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video bg-gray-100">
              {/* Video Player Component */}
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                هنا سيتم عرض الفيديو التعريفي
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
