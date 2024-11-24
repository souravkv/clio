'use client'

import Link from 'next/link'
import Typewriter from 'typewriter-effect'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { auth } from '../lib/firebase'
import { User } from 'firebase/auth'
import { Eye, EyeOff } from 'lucide-react';

const HomePageContent = () => {
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [showArts, setShowArts] = useState(false);

  useEffect(() => {
    setMounted(true)
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return () => unsubscribe()
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 animate-gradient-x" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse-slow" />

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setShowArts(!showArts)}
        className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-blue-950/50 
          hover:bg-blue-900/50 border border-blue-800/30 backdrop-blur-sm
          transition-all duration-300 group"
      >
        {showArts ? (
          <Eye className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
        ) : (
          <EyeOff className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
        )}
      </motion.button>

      {showArts && (
        <>
          <motion.div className="absolute left-20 bottom-32">
            <motion.div
              drag
              dragSnapToOrigin
              whileDrag={{ scale: 1.2 }}
              dragTransition={{ 
                bounceStiffness: 300,
                bounceDamping: 10
              }}
              animate={{
                y: [-10, 10],
                rotate: [-5, 5]
              }}
              transition={{
                y: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 3,
                  ease: "easeInOut"
                },
                rotate: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 4,
                  ease: "easeInOut"
                }
              }}
              className="text-4xl cursor-grab active:cursor-grabbing relative group"
            >
              <div className="absolute inset-0 bg-blue-900/90 backdrop-blur-[1px] opacity-100 
                transition-opacity duration-300 rounded-lg" />
              <span className="relative z-10 mix-blend-overlay">📚</span>
            </motion.div>
          </motion.div>

          <motion.div className="absolute right-32 top-32">
            <motion.div
              drag
              dragSnapToOrigin
              whileDrag={{ scale: 1.2 }}
              dragTransition={{ 
                bounceStiffness: 300,
                bounceDamping: 10
              }}
              animate={{
                y: [-8, 8],
                rotate: [5, -5]
              }}
              transition={{
                y: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 2.5,
                  ease: "easeInOut"
                },
                rotate: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 3.5,
                  ease: "easeInOut"
                }
              }}
              className="text-4xl cursor-grab active:cursor-grabbing relative group"
            >
              <div className="absolute inset-0 bg-blue-900/50 backdrop-blur-[1px] opacity-0 
                group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              <span className="relative z-10">✒️</span>
            </motion.div>
          </motion.div>

          <motion.div className="absolute left-1/4 top-24">
            <motion.div
              drag
              dragSnapToOrigin
              whileDrag={{ scale: 1.2 }}
              dragTransition={{ 
                bounceStiffness: 300,
                bounceDamping: 10
              }}
              animate={{
                y: [-12, 12],
                rotate: [-8, 8]
              }}
              transition={{
                y: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 4,
                  ease: "easeInOut"
                },
                rotate: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 5,
                  ease: "easeInOut"
                }
              }}
              className="text-4xl cursor-grab active:cursor-grabbing relative group"
            >
              <div className="absolute inset-0 bg-blue-900/50 backdrop-blur-[1px] opacity-0 
                group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              <span className="relative z-10">📝</span>
            </motion.div>
          </motion.div>

          <motion.div className="absolute right-1/4 bottom-40">
            <motion.div
              drag
              dragSnapToOrigin
              whileDrag={{ scale: 1.2 }}
              dragTransition={{ 
                bounceStiffness: 300,
                bounceDamping: 10
              }}
              animate={{
                y: [-15, 15],
                rotate: [8, -8]
              }}
              transition={{
                y: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 3.5,
                  ease: "easeInOut"
                },
                rotate: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 4.5,
                  ease: "easeInOut"
                }
              }}
              className="text-4xl cursor-grab active:cursor-grabbing relative group"
            >
              <div className="absolute inset-0 bg-blue-900/50 backdrop-blur-[1px] opacity-0 
                group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              <span className="relative z-10">📖</span>
            </motion.div>
          </motion.div>

          <motion.div className="absolute left-1/3 top-2/3">
            <motion.div
              drag
              dragSnapToOrigin
              whileDrag={{ scale: 1.2 }}
              dragTransition={{ 
                bounceStiffness: 300,
                bounceDamping: 10
              }}
              animate={{
                y: [-10, 10],
                rotate: [-10, 10]
              }}
              transition={{
                y: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 3.2,
                  ease: "easeInOut"
                },
                rotate: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 4.2,
                  ease: "easeInOut"
                }
              }}
              className="text-4xl cursor-grab active:cursor-grabbing relative group"
            >
              <div className="absolute inset-0 bg-blue-900/50 backdrop-blur-[1px] opacity-0 
                group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              <span className="relative z-10">🎯</span>
            </motion.div>
          </motion.div>

          <motion.div className="absolute right-1/3 top-1/4">
            <motion.div
              drag
              dragSnapToOrigin
              whileDrag={{ scale: 1.2 }}
              dragTransition={{ 
                bounceStiffness: 300,
                bounceDamping: 10
              }}
              animate={{
                y: [-12, 12],
                rotate: [12, -12]
              }}
              transition={{
                y: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 4.5,
                  ease: "easeInOut"
                },
                rotate: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 5.5,
                  ease: "easeInOut"
                }
              }}
              className="text-4xl cursor-grab active:cursor-grabbing relative group"
            >
              <div className="absolute inset-0 bg-blue-900/50 backdrop-blur-[1px] opacity-0 
                group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              <span className="relative z-10">⏰</span>
            </motion.div>
          </motion.div>
        </>
      )}

      {/* Left curvy arrow */}
      <div className="absolute left-0 top-1/2 -translate-y-20">
        <svg width="300" height="100" viewBox="0 0 300 100" className="text-blue-600/20">
          <path
            d="M0,50 C100,50 100,20 150,20 L290,20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="8,8"
          />
          <path
            d="M280,20 L290,20 L285,15 M280,20 L290,20 L285,25"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Right curvy arrow */}
      <div className="absolute right-0 top-1/2 -translate-y-20 rotate-180">
        <svg width="300" height="100" viewBox="0 0 300 100" className="text-blue-600/20">
          <path
            d="M0,50 C100,50 100,20 150,20 L290,20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="8,8"
          />
          <path
            d="M280,20 L290,20 L285,15 M280,20 L290,20 L285,25"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Auth buttons in top left */}
      {!user && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 left-4 z-50 flex items-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.dispatchEvent(new CustomEvent('openLogin'))}
            className="relative group px-4 py-1.5 rounded-full bg-zinc-900/80 backdrop-blur-sm 
              border border-zinc-800/50 text-blue-400 hover:text-blue-300 
              transition-all duration-300 text-sm overflow-hidden"
          >
            <div className="absolute inset-0 bg-blue-400/20 opacity-0 group-hover:opacity-100 
              blur-md transition-opacity duration-300" />
            <span className="relative z-10">Sign In</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.dispatchEvent(new CustomEvent('openSignup'))}
            className="px-4 py-1.5 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 text-violet-400 hover:text-violet-300 transition-all duration-300 text-sm"
          >
            Sign Up
          </motion.button>
        </motion.div>
      )}

      <div className="relative z-10 max-w-3xl w-full space-y-12">
        {/* Main heading with typewriter */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold tracking-tight">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString('Welcome to your study')
                  .start();
              }}
              options={{
                cursor: '',
                loop: false,
                autoStart: true,
                delay: 50,
                deleteSpeed: 9999999,
                wrapperClassName: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400",
              }}
            />
          </h1>
          <h2 className="text-6xl font-bold tracking-tight">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString('companion')
                  .pauseFor(3000)
                  .deleteAll()
                  .typeString('partner')
                  .pauseFor(3000)
                  .deleteAll()
                  .typeString('ally')
                  .pauseFor(3000)
                  .deleteAll()
                  .typeString('helper')
                  .pauseFor(3000)
                  .deleteAll()
                  .typeString('friend')
                  .pauseFor(3000)
                  .deleteAll()
                  .typeString('guide')
                  .pauseFor(3000)
                  .deleteAll()
                  .typeString('supporter')
                  .pauseFor(3000)
                  .deleteAll()
                  .typeString('mentor')
                  .pauseFor(3000)
                  .deleteAll()
                  .typeString('buddy')
                  .pauseFor(3000)
                  .deleteAll()
                  .typeString('sidekick')
                  .pauseFor(3000)
                  .deleteAll()
                  .typeString('confidant')
                  .pauseFor(3000)
                  .deleteAll()
                  .typeString('collaborator')
                  .pauseFor(3000)
                  .deleteAll()
                  .typeString('teammate')
                  .pauseFor(3000)
                  .deleteAll()
                  .typeString('advisor')
                  .pauseFor(3000)
                  .deleteAll()
                  .typeString('comrade')
                  .pauseFor(3000)
                  .deleteAll()
                  .typeString('assistant')
                  .pauseFor(3000)
                  .deleteAll()
                  .typeString('counselor')
                  .pauseFor(3000)
                  .deleteAll()
                  .typeString('companion')
                  .start();
              }}
              options={{
                loop: true,
                autoStart: true,
                delay: 80,
                deleteSpeed: 50,
                wrapperClassName: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400",
                cursorClassName: "text-violet-400 animate-pulse"
              }}
            />
          </h2>
        </div>

        {/* Animated subheading */}
        <p className="text-gray-400 text-xl animate-fade-in opacity-0 text-center animation-delay-1000">
          Your journey to productive learning starts here
        </p>

        {/* Call to action button */}
        <motion.div 
          className="flex flex-col items-center mt-12 animate-fade-in opacity-0 animation-delay-2000"
          animate={{ y: [-2, 2] }}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
        >
          <Link 
            href="/select" 
            className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg 
              font-medium transition-all duration-300 hover:bg-white/20 hover:scale-105 
              hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] border border-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg blur-md" />
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
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  )
}

export default HomePageContent