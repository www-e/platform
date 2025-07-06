// src/components/landing/Courses.tsx - Grade-specific Course Cards
'use client'

import { useState } from 'react'
import { BookOpenIcon, PlayIcon, StarIcon, ClockIcon } from 'lucide-react'
import Image from 'next/image'

const grades = [
  {
    id: 1,
    title: "الصف الأول",
    description: "أساسيات القراءة والكتابة والحساب",
    subjects: ["اللغة العربية", "الرياضيات", "العلوم", "التربية الإسلامية"],
    students: 150,
    rating: 4.9,
    lessons: 25,
    color: "from-blue-400 to-blue-600",
    image: "/api/placeholder/400/300"
  },
  {
    id: 2,
    title: "الصف الثاني", 
    description: "تطوير المهارات الأساسية والتفكير النقدي",
    subjects: ["اللغة العربية", "الرياضيات", "العلوم", "الاجتماعيات"],
    students: 200,
    rating: 4.8,
    lessons: 30,
    color: "from-green-400 to-green-600", 
    image: "/api/placeholder/400/300"
  },
  {
    id: 3,
    title: "الصف الثالث",
    description: "إعداد متقدم للمراحل التالية",
    subjects: ["اللغة العربية", "الرياضيات", "العلوم", "اللغة الإنجليزية"],
    students: 180,
    rating: 4.9,
    lessons: 35,
    color: "from-purple-400 to-purple-600",
    image: "/api/placeholder/400/300"
  }
]

export default function Courses() {
  const [selectedGrade, setSelectedGrade] = useState(1)
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            اختر الصف المناسب لطفلك
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            برامج تعليمية مصممة خصيصاً لكل مرحلة عمرية مع مراعاة الفروق الفردية
          </p>
        </div>

        {/* Grade Selection Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg">
            {grades.map((grade) => (
              <button
                key={grade.id}
                onClick={() => setSelectedGrade(grade.id)}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  selectedGrade === grade.id
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {grade.title}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {grades.map((grade) => (
            <div
              key={grade.id}
              className={`group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                selectedGrade === grade.id ? 'ring-4 ring-orange-200 scale-105' : ''
              }`}
            >
              {/* Card Header */}
              <div className={`relative h-48 bg-gradient-to-br ${grade.color}`}>
                <Image
                  src={grade.image}
                  alt={grade.title}
                  fill
                  className="object-cover mix-blend-overlay"
                />
                
                {/* Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                  <div className="flex items-center gap-2">
                    <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold text-sm">{grade.rating}</span>
                  </div>
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                    <PlayIcon className="w-6 h-6 text-white ml-1" />
                  </button>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {grade.title}
                </h3>
                
                <p className="text-gray-600 mb-6">
                  {grade.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-6 mb-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <BookOpenIcon className="w-4 h-4" />
                    <span>{grade.lessons} درس</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4" />
                    <span>مرن</span>
                  </div>
                </div>

                {/* Subjects */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">المواد المتاحة:</h4>
                  <div className="flex flex-wrap gap-2">
                    {grade.subjects.map((subject, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="text-sm text-gray-600">
                    {grade.students} طالب مسجل
                  </div>
                  
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                    ابدأ الآن
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
