'use client'

import HomePageContent from '../components/home-page'

import Image from 'next/image'
import zourv from '../assets/zourv.jpg'
import { FaGithub, FaTwitter, FaInstagram, FaCoffee, FaLinkedin } from 'react-icons/fa'


import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'
import { auth, db } from '../lib/firebase'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { UserData, UserInterests } from '../types/user'
import Typewriter from 'typewriter-effect'
import { FirebaseError } from '../types/error'
import { isPremiumUser } from '../lib/utils'
import { toast } from 'react-hot-toast'

interface UserProfile {
  name: string;
  age: number;
}

const getTimeBasedGreeting = (name: string) => {
  const hour = new Date().getHours()
  
  if (hour >= 5 && hour < 12) {
    return `Good morning, ${name}`
  } else if (hour >= 12 && hour < 18) {
    return `Good afternoon, ${name}`
  } else if (hour >= 18 && hour < 22) {
    return `Good evening, ${name}`
  } else {
    return `Good night, ${name}`
  }
}

export default function HomePage() {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid)
          const userDocSnap = await getDoc(userDocRef)
          
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data()
            setUserProfile({
              name: userData.name,
              age: userData.age
            })
          }
        } catch (error) {
          console.error('Error fetching user profile:', error)
        }
      } else {
        setUserProfile(null)
      }
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.pageX}px`
      cursor.style.top = `${e.pageY}px`
    }

    document.addEventListener('mousemove', moveCursor)
    return () => document.removeEventListener('mousemove', moveCursor)
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      toast.success('Logged out successfully', {
        icon: '👋',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
    } catch (error: any) {
      toast.error('Error signing out', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
      console.error('Error signing out:', error)
    }
  }

  const AuthModal = ({ isLogin = true }: { isLogin?: boolean }) => {
    const [localEmail, setLocalEmail] = useState('')
    const [localPassword, setLocalPassword] = useState('')
    const [localError, setLocalError] = useState('')
    const [step, setStep] = useState(1)
    
    // Additional signup fields
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [fieldOfStudy, setFieldOfStudy] = useState('')
    const [interests, setInterests] = useState<UserInterests>({
      music: false,
      art: false,
      gaming: false,
      reels: false,
      editing: false,
      reading: false,
      writing: false,
      coding: false,
      sports: false
    })

    const handleInterestToggle = (interest: keyof UserInterests) => {
      setInterests(prev => ({
        ...prev,
        [interest]: !prev[interest]
      }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      
      if (!isLogin) {
        if (step === 1) {
          if (!localEmail || !localPassword) {
            setLocalError('Please fill in all fields')
            return
          }
          setStep(2)
          return
        }

        try {
          const userCredential = await createUserWithEmailAndPassword(auth, localEmail, localPassword)
          
          const userData: UserData = {
            name,
            age: parseInt(age),
            fieldOfStudy,
            interests,
            email: localEmail,
            uid: userCredential.user.uid
          }

          try {
            await setDoc(doc(db, 'users', userCredential.user.uid), userData)
            setIsSignupModalOpen(false)
          } catch (error: unknown) {
            const firebaseError = error as FirebaseError
            console.error('Firestore Error:', firebaseError)
            setLocalError('Failed to save profile data. Please try again.')
          }
        } catch (error: unknown) {
          const firebaseError = error as FirebaseError
          setLocalError(firebaseError.message)
        }
        return
      }

      try {
        await signInWithEmailAndPassword(auth, localEmail, localPassword)
        setIsLoginModalOpen(false)
      } catch (error: unknown) {
        const firebaseError = error as FirebaseError
        setLocalError(firebaseError.message)
      }
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-zinc-800/50 shadow-2xl w-full max-w-md"
        >
          {/* Modal Header with Gradient */}
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-6 border-b border-zinc-800/50">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                {isLogin ? 'Welcome Back' : (step === 1 ? 'Create Account' : 'Complete Your Profile')}
              </h2>
              <button 
                onClick={() => isLogin ? setIsLoginModalOpen(false) : setIsSignupModalOpen(false)}
                className="text-zinc-400 hover:text-white transition-all duration-200 hover:rotate-90"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {isLogin ? (
                // Login Form
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Email</label>
                    <input
                      type="email"
                      value={localEmail}
                      onChange={(e) => setLocalEmail(e.target.value)}
                      placeholder="unni@gmail.com"
                      className="w-full bg-zinc-900/50 text-white px-4 py-3 rounded-lg border border-zinc-800 focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Password</label>
                    <input
                      type="password"
                      value={localPassword}
                      onChange={(e) => setLocalPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-zinc-900/50 text-white px-4 py-3 rounded-lg border border-zinc-800 focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                </>
              ) : (
                // Signup Form
                step === 1 ? (
                  // Step 1: Email and Password
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">Email</label>
                      <input
                        type="email"
                        value={localEmail}
                        onChange={(e) => setLocalEmail(e.target.value)}
                        placeholder="unni@gmail.com"
                        className="w-full bg-zinc-900/50 text-white px-4 py-3 rounded-lg border border-zinc-800 focus:outline-none focus:border-blue-500/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">Password</label>
                      <input
                        type="password"
                        value={localPassword}
                        onChange={(e) => setLocalPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-zinc-900/50 text-white px-4 py-3 rounded-lg border border-zinc-800 focus:outline-none focus:border-blue-500/50"
                      />
                    </div>
                  </>
                ) : (
                  // Step 2: Additional Information
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-zinc-900/50 text-white px-4 py-3 rounded-lg border border-zinc-800 focus:outline-none focus:border-blue-500/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">Age</label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full bg-zinc-900/50 text-white px-4 py-3 rounded-lg border border-zinc-800 focus:outline-none focus:border-blue-500/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">Field of Study</label>
                      <input
                        type="text"
                        value={fieldOfStudy}
                        onChange={(e) => setFieldOfStudy(e.target.value)}
                        className="w-full bg-zinc-900/50 text-white px-4 py-3 rounded-lg border border-zinc-800 focus:outline-none focus:border-blue-500/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">Interests</label>
                      <div className="grid grid-cols-3 gap-2">
                        {Object.keys(interests).map((interest) => (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => handleInterestToggle(interest as keyof UserInterests)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              interests[interest as keyof UserInterests]
                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                                : 'bg-zinc-800/50 text-zinc-400 border border-zinc-700/50'
                            }`}
                          >
                            {interest}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )
              )}

              {localError && (
                <p className="text-red-400 text-sm">{localError}</p>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-violet-500 text-white py-3 rounded-lg font-medium"
              >
                {isLogin ? 'Sign In' : (step === 1 ? 'Next' : 'Create Account')}
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  useEffect(() => {
    const handleOpenLogin = () => setIsLoginModalOpen(true)
    const handleOpenSignup = () => setIsSignupModalOpen(true)
    
    window.addEventListener('openLogin', handleOpenLogin)
    window.addEventListener('openSignup', handleOpenSignup)
    
    return () => {
      window.removeEventListener('openLogin', handleOpenLogin)
      window.removeEventListener('openSignup', handleOpenSignup)
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

      {/* User email display */}
      {user && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 left-4 z-50 flex items-center gap-2 bg-zinc-900/80 backdrop-blur-sm px-4 py-2 rounded-full border border-zinc-800/50"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-zinc-500 to-zinc-600 flex items-center justify-center text-white font-medium">
              {user.email?.[0].toUpperCase()}
            </div>
            <span className="text-zinc-300 text-sm">{user.email}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="ml-2 px-3 py-1 text-sm bg-zinc-800/50 text-zinc-400 rounded-full hover:bg-zinc-700/50 transition-all duration-200"
          >
            Logout
          </motion.button>
        </motion.div>
      )}

      {/* Bottom navigation bar */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl bg-zinc-900/50 backdrop-blur-md rounded-lg p-3 flex justify-between items-center text-white shadow-lg z-50">
        <div className="flex items-center gap-4">
          <Link href="/docs" className="px-3 py-1 text-sm font-light text-blue-300 hover:text-blue-400 transition-colors duration-300">
            Docs
          </Link>
          {userProfile && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-light"
            >
              <Typewriter
                options={{
                  strings: [getTimeBasedGreeting(userProfile.name)],
                  autoStart: true,
                  loop: false,
                  deleteSpeed: 9999999,
                  delay: 50,
                  cursor: '...',
                  wrapperClassName: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400",
                  cursorClassName: "text-violet-400 animate-pulse"
                }}
              />
            </motion.div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Link href="/support" className="px-3 py-1 text-sm font-light text-blue-300 hover:text-blue-400 transition-colors duration-300">
            Support
          </Link>
          <Link href="/premium" className="px-3 py-1 text-sm font-light text-violet-400 hover:text-violet-600 transition-colors duration-300">
            Premium
          </Link>
          <Link href="/contribute" className="px-3 py-1 text-sm font-light text-blue-300 hover:text-blue-400 transition-colors duration-300">
            Contribute
          </Link>
        </div>
      </div>

      {/* Auth Modals */}
      <AnimatePresence>
        {isLoginModalOpen && <AuthModal isLogin={true} />}
        {isSignupModalOpen && <AuthModal isLogin={false} />}
      </AnimatePresence>

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
              <Image src={zourv} alt="Sourav KV" className="w-40 h-40 rounded-full mx-auto mb-4" />
              <h3 className="text-2xl font-medium text-white">Sourav KV</h3>
              <p className="text-zinc-400 mb-4">Connect with me:</p>
              <div className="flex justify-center gap-6">
                <Link 
                  href="https://github.com/souravkv" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500 transition-colors"
                >
                  <FaGithub size={30} />
                </Link>
                <Link 
                  href="https://x.com/m_aysou" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500 transition-colors"
                >
                  <FaTwitter size={30} />
                </Link>
                <Link 
                  href="https://www.instagram.com/zourv_/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500 transition-colors"
                >
                  <FaInstagram size={30} />
                </Link>
                <Link 
                  href="https://buymeacoffee.com/spexod" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500 transition-colors"
                >
                  <FaCoffee size={30} />
                </Link>
                <Link 
                  href="https://www.linkedin.com/in/sourav-kv/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500 transition-colors"
                >
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