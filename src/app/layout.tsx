// src/app/layout.tsx
import './globals.css'
import Navbar from '@/components/layout/Navbar'

export const metadata = {
  title: 'Course Platform MVP',
  description: '...',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar">
      <body className="bg-gray-50">
        <Navbar />           {/* ← Navbar appears site-wide */}
        <main className="pt-20">{children}</main>  {/* pt-20 to offset fixed navbar */}
      </body>
    </html>
  )
}
