// src/components/layout/Navbar.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MenuIcon, XIcon } from 'lucide-react'

const navItems = [
  { label: 'الرئيسية', href: '/' },
  { label: 'الدورات', href: '/courses/1' },
  { label: 'الملف الشخصي', href: '/profile' },
  { label: 'تواصل معنا', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-orange-600">منصتنا</Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-700 hover:text-orange-500 transition"
            >
              {item.label}
            </Link>
          ))}

          {/* Sign Up / Sign In */}
          <Link
            href="/register"
            className="ml-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            تسجيل جديد
          </Link>
          <Link
            href="/login"
            className="ml-2 bg-transparent border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            تسجيل دخول
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 md:hidden`}>
        <div className="absolute top-0 right-0 w-3/4 max-w-xs h-full bg-white shadow-lg p-6">
          <nav className="flex flex-col space-y-4 mt-8">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-800 text-lg hover:text-orange-500 transition"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="mt-6 inline-block bg-orange-500 text-white text-center px-4 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              تسجيل جديد
            </Link>
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="inline-block bg-gray-200 text-gray-800 text-center px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              تسجيل دخول
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
