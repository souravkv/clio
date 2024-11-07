'use client'

import HomePageContent from '../components/home-page'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaTwitter, FaInstagram, FaCoffee, FaLinkedin, FaHeart } from 'react-icons/fa'
import zourv from '../assets/zourv.jpg'

export default function HomePage() {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.pageX}px`
      cursor.style.top = `${e.pageY}px`
    }

    document.addEventListener('mousemove', moveCursor)

    return () => {
      document.removeEventListener('mousemove', moveCursor)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-black">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-pink-600/30 animate-pulse-slow" />

      {/* Grid pattern for texture */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Floating orbs */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slower" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Brand logo at the top */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
        <span className="text-5xl font-bold text-white">
          <span className="text-blue-400">cli</span>
          <span className="text-blue-500">o</span>
        </span>
      </div>

      {/* Support Me button */}
      <motion.button
        onClick={() => setIsModalOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-4 right-4 bg-blue-500/20 text-blue-400 p-3 rounded-full hover:bg-blue-500/30 transition-colors z-50 shadow-lg"
      >
        <FaHeart size={24} />
      </motion.button>

      {/* Content */}
      <div className="relative z-10">
        <HomePageContent />
      </div>

      {/* Bottom navigation bar */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl bg-zinc-900/50 backdrop-blur-md rounded-lg p-3 flex justify-between items-center text-white shadow-lg z-50">
        <div className="flex items-center gap-4">
          <Link href="/login" className="px-3 py-1 text-sm font-light text-blue-300 hover:text-blue-400 transition-colors duration-300">Login</Link>
          <Link href="/signup" className="px-3 py-1 text-sm font-light text-blue-300 hover:text-blue-400 transition-colors duration-300">Signup</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/docs" className="px-3 py-1 text-sm font-light text-blue-300 hover:text-blue-400 transition-colors duration-300">Docs</Link>
          <Link href="/support" className="px-3 py-1 text-sm font-light text-blue-300 hover:text-blue-400 transition-colors duration-300">Support</Link>
          <Link href="/premium" className="px-3 py-1 text-sm font-light text-blue-300 hover:text-blue-400 transition-colors duration-300">Premium</Link>
        </div>
      </div>

      {/* Custom cursor */}
      <div ref={cursorRef} className="fixed w-4 h-4 border border-white rounded-full pointer-events-none z-50 opacity-70" style={{ transform: 'translate(-50%, -50%)' }} />

      {/* Support Me Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-zinc-900/90 rounded-xl overflow-hidden border border-zinc-800/50 shadow-2xl w-full max-w-lg p-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold text-white">Support Me</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-white hover:text-red-400 transition-colors">
                ✕
              </button>
            </div>
            <div className="text-center">
              <img src={zourv.src} alt="Sourav KV" className="w-40 h-40 rounded-full mx-auto mb-4" />
              <h3 className="text-2xl font-medium text-white">Sourav KV</h3>
              <p className="text-zinc-400 mb-4">Connect with me:</p>
              <div className="flex justify-center gap-6">
                <Link href="https://github.com/souravkv" className="text-blue-400 hover:text-blue-500 transition-colors">
                  <FaGithub size={30} />
                </Link>
                <Link href="https://x.com/m_aysou" className="text-blue-400 hover:text-blue-500 transition-colors">
                  <FaTwitter size={30} />
                </Link>
                <Link href="https://www.instagram.com/zourv_/" className="text-blue-400 hover:text-blue-500 transition-colors">
                  <FaInstagram size={30} />
                </Link>
                <Link href="https://buymeacoffee.com/spexod" className="text-blue-400 hover:text-blue-500 transition-colors">
                  <FaCoffee size={30} />
                </Link>
                <Link href="https://www.linkedin.com/in/sourav-kv/" className="text-blue-400 hover:text-blue-500 transition-colors">
                  <FaLinkedin size={30} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}