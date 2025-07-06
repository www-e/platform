// src/components/landing/Features.tsx - Modern Features Section
'use client'

import {
  BookOpenIcon,
  VideoIcon,
  TrophyIcon,
  ClockIcon,
  UsersIcon,
  ShieldCheckIcon
} from 'lucide-react'

const features = [
  {
    icon: VideoIcon,
    title: "دروس تفاعلية عالية الجودة",
    description: "فيديوهات مصورة بجودة 4K مع شرح واضح وأمثلة تطبيقية",
    color: "bg-orange-100 text-orange-600"
  },
  {
    icon: UsersIcon,
    title: "متابعة شخصية لكل طالب",
    description: "تقييم مستمر وتقارير دورية لولي الأمر عن تقدم الطالب",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: BookOpenIcon,
    title: "منهج شامل ومتطور",
    description: "يغطي جميع المواد الدراسية للصفوف 1، 2، 3 بطريقة حديثة",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: ClockIcon,
    title: "مرونة في الأوقات",
    description: "تعلم في أي وقت يناسبك مع إمكانية مراجعة الدروس",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: TrophyIcon,
    title: "نظام مكافآت وتحديات",
    description: "ألعاب تعليمية وشارات تحفيزية لزيادة الدافعية",
    color: "bg-yellow-100 text-yellow-600"
  },
  {
    icon: ShieldCheckIcon,
    title: "بيئة آمنة للتعلم",
    description: "منصة آمنة ومراقبة مع أدوات حماية متقدمة",
    color: "bg-red-100 text-red-600"
  }
]

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            لماذا نحن الخيار الأفضل؟
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نقدم تجربة تعليمية فريدة تجمع بين أحدث التقنيات والأساليب التعليمية المتطورة
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group p-8 bg-gray-50 hover:bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-12 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-orange-100">طالب راضي</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-orange-100">درس تفاعلي</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-orange-100">نسبة النجاح</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-orange-100">دعم فني</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
