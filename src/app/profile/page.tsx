// src/app/profile/page.tsx
'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { BookOpenIcon, TrophyIcon, CalendarIcon, BarChart3Icon } from 'lucide-react'

type Course = {
  id: string
  title: string
  grade: number
  progress?: number
}

type ExamResult = {
  id: string
  exam: {
    title: string
    subject: string
    examDate: string
    maxScore: number
  }
  score: number
  percentage: number
  status: string
}

type ProfileStats = {
  totalCourses: number
  completedCourses: number
  averageScore: number
  totalExams: number
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [courses, setCourses] = useState<Course[]>([])
  const [examResults, setExamResults] = useState<ExamResult[]>([])
  const [stats, setStats] = useState<ProfileStats>({
    totalCourses: 0,
    completedCourses: 0,
    averageScore: 0,
    totalExams: 0
  })
  const [activeTab, setActiveTab] = useState<'courses' | 'exams' | 'progress'>('courses')
  const loading = status === 'loading'

  useEffect(() => {
    if (session?.user?.id) {
      // Fetch courses
      fetch('/api/profile/courses')
        .then(res => res.json())
        .then(data => setCourses(data.courses))

      // Fetch exam results  
      fetch('/api/profile/exams')
        .then(res => res.json())
        .then(data => setExamResults(data.examResults))

      // Fetch stats
      fetch('/api/profile/stats')
        .then(res => res.json())
        .then(data => setStats(data.stats))
    }
  }, [session])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">جارٍ التحميل...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">تسجيل الدخول مطلوب</h2>
          <p className="text-gray-600">يرجى تسجيل الدخول لعرض الملف الشخصي.</p>
        </div>
      </div>
    )
  }

  const { name, studentId, grade } = session.user as any

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              {/* Avatar */}
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {name?.charAt(0)}
              </div>
              
              {/* Basic Info */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
                <div className="space-y-1 text-gray-600">
                  <p><span className="font-medium">رقم الطالب:</span> {studentId}</p>
                  <p><span className="font-medium">الصف:</span> الصف {grade}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <div className="text-2xl font-bold text-orange-600">{stats.totalCourses}</div>
                <div className="text-sm text-gray-600">دورة مسجلة</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600">{stats.averageScore}%</div>
                <div className="text-sm text-gray-600">متوسط الدرجات</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'courses', label: 'الدورات المسجلة', icon: BookOpenIcon },
                { id: 'exams', label: 'نتائج الامتحانات', icon: TrophyIcon },
                { id: 'progress', label: 'التقدم الأكاديمي', icon: BarChart3Icon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">الدورات المسجلة</h2>
                {courses.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map(course => (
                      <div key={course.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="font-semibold text-gray-900">{course.title}</h3>
                          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                            الصف {course.grade}
                          </span>
                        </div>
                        
                        {course.progress && (
                          <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                              <span>التقدم</span>
                              <span>{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors">
                          متابعة التعلم
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpenIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">لم يتم التسجيل في أي دورة بعد</p>
                  </div>
                )}
              </div>
            )}

            {/* Exams Tab */}
            {activeTab === 'exams' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">نتائج الامتحانات</h2>
                {examResults.length > 0 ? (
                  <div className="space-y-4">
                    {examResults.map(result => (
                      <div key={result.id} className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{result.exam.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>{result.exam.subject}</span>
                              <span className="flex items-center gap-1">
                                <CalendarIcon className="w-4 h-4" />
                                {new Date(result.exam.examDate).toLocaleDateString('ar-EG')}
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">
                              {result.score}/{result.exam.maxScore}
                            </div>
                            <div className={`text-sm font-medium ${
                              result.status === 'pass' ? 'text-green-600' : 
                              result.status === 'fail' ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              {result.percentage}%
                            </div>
                          </div>
                          
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            result.status === 'pass' ? 'bg-green-100 text-green-600' :
                            result.status === 'fail' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {result.status === 'pass' ? 'نجح' : result.status === 'fail' ? 'رسب' : 'غائب'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <TrophyIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">لا توجد نتائج امتحانات متاحة</p>
                  </div>
                )}
              </div>
            )}

            {/* Progress Tab */}
            {activeTab === 'progress' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">التقدم الأكاديمي</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Academic Performance Chart Placeholder */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">أداء الامتحانات</h3>
                    <div className="h-48 flex items-center justify-center text-gray-500">
                      [مخطط الأداء الأكاديمي]
                    </div>
                  </div>
                  
                  {/* Course Progress */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">تقدم الدورات</h3>
                    <div className="space-y-4">
                      {courses.slice(0, 3).map(course => (
                        <div key={course.id}>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-700">{course.title}</span>
                            <span className="text-gray-600">{course.progress || 0}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-orange-500 h-2 rounded-full"
                              style={{ width: `${course.progress || 0}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
