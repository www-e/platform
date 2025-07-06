// src/components/admin/AdminSidebar.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  HomeIcon, 
  BookOpenIcon, 
  UsersIcon, 
  FileTextIcon, 
  BarChart3Icon,
  SettingsIcon,
  LogOutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  GraduationCapIcon
} from 'lucide-react'
import { signOut } from 'next-auth/react'

const menuItems = [
  {
    title: 'لوحة التحكم',
    href: '/admin',
    icon: HomeIcon
  },
  {
    title: 'إدارة الدورات',
    href: '/admin/courses',
    icon: BookOpenIcon
  },
  {
    title: 'إدارة الطلاب',
    href: '/admin/students',
    icon: UsersIcon
  },
  {
    title: 'إدارة الامتحانات',
    href: '/admin/exams',
    icon: FileTextIcon
  },
  {
    title: 'التقارير والإحصائيات',
    href: '/admin/analytics',
    icon: BarChart3Icon
  },
  {
    title: 'الإعدادات',
    href: '/admin/settings',
    icon: SettingsIcon
  }
]

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } h-screen fixed left-0 top-0 z-40`}>
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <GraduationCapIcon className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-gray-900">لوحة المعلم</h1>
          )}
        </div>
        
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || 
                          (pathname.startsWith(item.href) && item.href !== '/admin')
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-orange-50 text-orange-600 border-r-4 border-orange-500' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="font-medium">{item.title}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className={`flex items-center gap-3 p-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <LogOutIcon className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <span className="font-medium">تسجيل الخروج</span>
          )}
        </button>
      </div>
    </div>
  )
}
