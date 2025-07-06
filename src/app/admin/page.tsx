// src/app/admin/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { Users, BookOpen, FileText, TrendingUp, GraduationCap, ClockIcon } from 'lucide-react'

type DashboardStats = {
  totalStudents: number
  totalCourses: number
  totalExams: number
  averageGrade: number
  newEnrollmentsThisWeek: number
  activeStudentsToday: number
}

type RecentActivity = {
  id: string
  type: 'enrollment' | 'exam' | 'course'
  message: string
  timestamp: string
  user: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalCourses: 0,
    totalExams: 0,
    averageGrade: 0,
    newEnrollmentsThisWeek: 0,
    activeStudentsToday: 0
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        const [statsRes, activityRes] = await Promise.all([
          fetch('/api/admin/dashboard/stats'),
          fetch('/api/admin/dashboard/activity')
        ])
        
        const statsData = await statsRes.json()
        const activityData = await activityRes.json()
        
        setStats(statsData.stats)
        setRecentActivity(activityData.activities)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const statCards = [
    {
      title: 'إجمالي الطلاب',
      value: stats.totalStudents,
      icon: Users,
      color: 'bg-blue-500',
      change: `+${stats.newEnrollmentsThisWeek} هذا الأسبوع`
    },
    {
      title: 'إجمالي الدورات',
      value: stats.totalCourses,
      icon: BookOpen,
      color: 'bg-green-500',
      change: 'نشط'
    },
    {
      title: 'الامتحانات',
      value: stats.totalExams,
      icon: FileText,
      color: 'bg-orange-500',
      change: 'مُكملة'
    },
    {
      title: 'متوسط الدرجات',
      value: `${stats.averageGrade}%`,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: 'عام'
    },
    {
      title: 'الطلاب النشطين',
      value: stats.activeStudentsToday,
      icon: GraduationCap,
      color: 'bg-indigo-500',
      change: 'اليوم'
    }
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <ClockIcon className="w-4 h-4" />
            آخر تحديث: منذ قليل
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border animate-pulse">
              <div className="h-12 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <ClockIcon className="w-4 h-4" />
          آخر تحديث: {new Date().toLocaleTimeString('ar-EG')}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-xl font-bold text-gray-900 mb-6">النشاط الأخير</h2>
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'enrollment' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'exam' ? 'bg-green-100 text-green-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    {activity.type === 'enrollment' ? <Users className="w-5 h-5" /> :
                     activity.type === 'exam' ? <FileText className="w-5 h-5" /> :
                     <BookOpen className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm text-gray-600">{activity.user}</p>
                      <span className="text-gray-400">•</span>
                      <p className="text-sm text-gray-500">{activity.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ClockIcon className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">لا توجد أنشطة حديثة</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-xl font-bold text-gray-900 mb-6">إجراءات سريعة</h2>
          <div className="grid grid-cols-2 gap-4">
            
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors group">
              <BookOpen className="w-8 h-8 text-gray-400 group-hover:text-orange-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600 group-hover:text-orange-600">إضافة دورة جديدة</p>
            </button>
            
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
              <FileText className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600">إنشاء امتحان</p>
            </button>
            
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group">
              <Users className="w-8 h-8 text-gray-400 group-hover:text-green-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600 group-hover:text-green-600">إدارة الطلاب</p>
            </button>
            
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group">
              <TrendingUp className="w-8 h-8 text-gray-400 group-hover:text-purple-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600 group-hover:text-purple-600">عرض التقارير</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
