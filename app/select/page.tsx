'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import Typewriter from 'typewriter-effect'
import { useEffect, useState } from 'react'
import { auth, db } from '../../lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { getRandomSelectMessage } from '../../utils/messages'

function TopNav() {
  const router = useRouter()

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
        <Link href="/select" className="text-md font-bold hover:opacity-90 transition-colors">
          <span className="text-blue-400">cli</span>
          <span className="text-blue-500">o</span>
        </Link>
        <button 
          onClick={() => router.push('/')}
          className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800/50"
        >
          Go Back
        </button>
      </div>
    </motion.div>
  )
}

export default function SelectPage() {
  const router = useRouter()
  const [userName, setUserName] = useState<string>('')

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        if (userDoc.exists()) {
          setUserName(userDoc.data().name)
        }
      }
    }
    fetchUserData()
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* Simplified static gradient background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/50 via-zinc-900 to-zinc-950" />

      {/* Subtle grid pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Content */}
      <div className="relative z-50 min-h-screen flex flex-col items-center justify-center p-8">
        {/* MacOS-like window wrapper */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-6xl bg-zinc-900/90 rounded-xl overflow-hidden border border-zinc-800/50 shadow-2xl relative"
        >
          {/* Web texture pattern overlay */}
          <div className="absolute inset-0 opacity-[0.15]"
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                 backgroundSize: '30px 30px'
               }}
          />

          {/* Window title bar */}
          <TopNav />

          {/* Window content */}
          <div className="p-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center flex flex-col items-center mb-16"
            >
              <div className="text-4xl font-bold h-32 flex items-center">
                <Typewriter
                  options={{
                    strings: [getRandomSelectMessage(userName || 'there')],
                    autoStart: true,
                    loop: false,
                    deleteSpeed: 9999999,
                    delay: 80,
                    wrapperClassName: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400",
                    cursorClassName: "text-violet-400 animate-pulse",
                    cursor: '...'
                  }}
                />
              </div>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                className="relative"
              >
                <Link href="/home">
                  <div className="relative group overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-8 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">📚</span>
                        <h2 className="text-2xl font-bold text-blue-400">clio-study</h2>
                      </div>
                      <p className="text-zinc-300 mb-6 text-base">
                        Your personal space for focused learning, task management, and study organization.
                      </p>
                      <ul className="space-y-3 text-sm text-zinc-400 mt-auto">
                        <li className="flex items-center gap-3">
                          <span className="text-lg w-6">📝</span>
                          <span>Create and organize detailed study notes</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="text-lg w-6">✓</span>
                          <span>Track tasks and assignments efficiently</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="text-lg w-6">🕒</span>
                          <span>Plan your schedule with interactive timetable</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                className="relative"
              >
                <Link href="/social">
                  <div className="relative group overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-8 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">🤝</span>
                        <h2 className="text-2xl font-bold text-violet-400">clio-social</h2>
                      </div>
                      <p className="text-zinc-300 mb-6 text-base">
                        Connect with fellow students, share knowledge, and learn together in a collaborative environment.
                      </p>
                      <ul className="space-y-3 text-sm text-zinc-400 mt-auto">
                        <li className="flex items-center gap-3">
                          <span className="text-lg w-6">👥</span>
                          <span>Join and create study groups</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="text-lg w-6">💬</span>
                          <span>Engage in topic-focused discussions</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="text-lg w-6">📚</span>
                          <span>Share and access learning resources</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 