// src/app/page.tsx - Main Landing Page
import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import Courses from '@/components/landing/Courses'
import Testimonials from '@/components/landing/Testimonials'
import CTA from '@/components/landing/CTA'
import Footer from '@/components/layout/Footer'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Hero />
      <Features />
      <Courses />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
