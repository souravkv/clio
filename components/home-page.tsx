'use client'

import Link from 'next/link'
import Typewriter from 'typewriter-effect'
import { useState, useEffect } from 'react'

const HomePageContent = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 max-w-3xl w-full space-y-12">
        {/* Main heading with typewriter */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString('Welcome to your study companion')
                  .start();
              }}
              options={{
                cursor: '|',
                loop: false,
                autoStart: true,
                delay: 50,
              }}
            />
          </h1>
          
          {/* Animated subheading */}
          <p className="text-gray-400 text-xl animate-fade-in opacity-0 animation-delay-1000">
            Your journey to productive learning starts here
          </p>
        </div>

        {/* Call to action button with hover effects */}
        <div className="flex flex-col items-center mt-12 animate-fade-in opacity-0 animation-delay-2000">
          <Link 
            href="/select" 
            className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-medium 
                     transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]
                     border border-white/10"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start your journey
              <svg 
                className="w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  )
}

export default HomePageContent