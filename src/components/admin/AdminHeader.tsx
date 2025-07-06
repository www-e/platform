// src/components/admin/AdminHeader.tsx
'use client'

import { useSession } from 'next-auth/react'
import { BellIcon, SearchIcon, UserIcon } from 'lucide-react'

export default function AdminHeader() {
  const { data: session } = useSession()

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        
        {/* Search Bar */}
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="البحث..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Side - Notifications & Profile */}
        <div className="flex items-center gap-4">
          
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <BellIcon className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-white" />
            </div>
            <div className="text-sm">
              <div className="font-medium text-gray-900">{session?.user?.name}</div>
              <div className="text-gray-600">معلم</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
