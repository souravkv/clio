'use client'

import Sidebar from '../../components/sidebar'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

function TopNav() {
  const router = useRouter()
  const pathname = usePathname()

  const handleGoBack = () => {
    if (pathname === '/home' || pathname === '/home/cliox' || 
        pathname === '/home/notes' || pathname === '/home/todo' || 
        pathname === '/home/timetable') {
      router.push('/select')
    } else if (pathname === '/social') {
      router.push('/select')
    } else {
      router.back()
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="h-12 bg-zinc-900 border-b border-zinc-800/50 flex items-center px-4 relative z-10"
    >
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <div className="flex-1 flex justify-between items-center px-4">
        <Link href="/home" className="text-md font-bold hover:opacity-90 transition-colors ">
          <span className="text-blue-400">cli</span>
          <span className="text-blue-500">o</span>
          <span className="text-blue-300 text-md "> stu</span>
          <span className="text-blue-400  ">dy</span>
        </Link>
        <button 
          onClick={handleGoBack}
          className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800/50"
        >
          Go Back
        </button>
      </div>
    </motion.div>
  )
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* Gradient background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/50 via-zinc-900 to-zinc-950" />

      {/* Subtle grid pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Content */}
      <div className="relative z-50 min-h-screen p-8">
        <AnimatePresence>
          {isLoading ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-2xl text-white font-medium"
              >
                Opening Workspace...
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring",
                duration: 0.5,
                bounce: 0.3
              }}
              className="fixed inset-8 bg-zinc-900/90 rounded-xl overflow-hidden border border-zinc-800/50 shadow-2xl"
            >
              {/* Line texture pattern */}
              <div 
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23FFFFFF' stroke-width='1'%3E%3Cpath d='M0 40h40M0 35h40M0 30h40M0 25h40M0 20h40M0 15h40M0 10h40M0 5h40M0 0h40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: '20px 20px'
                }}
              />

              {/* Window title bar */}
              <TopNav />

              {/* Main content area with fixed height */}
              <div className="flex h-[calc(100%-3rem)] overflow-hidden">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Sidebar />
                </motion.div>
                <motion.main 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex-1 overflow-auto p-4"
                >
                  <div className="rounded-2xl bg-zinc-900/50 backdrop-blur-lg border border-zinc-800/50 h-full overflow-auto relative">
                    {/* Content line texture */}
                    <div 
                      className="absolute inset-0 opacity-[0.02]"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23FFFFFF' stroke-width='1'%3E%3Cpath d='M0 40h40M0 35h40M0 30h40M0 25h40M0 20h40M0 15h40M0 10h40M0 5h40M0 0h40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '20px 20px'
                      }}
                    />
                    {children}
                  </div>
                </motion.main>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 