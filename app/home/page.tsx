'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { auth, db } from '../../lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import Typewriter from 'typewriter-effect'

interface UserData {
  name: string;
  interests: Record<string, boolean>;
}

export default function HomePage() {
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        if (userDoc.exists()) {
          const data = userDoc.data()
          setUserData({
            name: data.name,
            interests: data.interests
          })
        }
      }
    }
    fetchUserData()
  }, [])

  const getRandomInterest = () => {
    if (!userData?.interests) return ''
    const activeInterests = Object.entries(userData.interests)
      .filter(([, value]) => value)
      .map(([key]) => key)
    return activeInterests[Math.floor(Math.random() * activeInterests.length)]
  }

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-4xl font-bold text-white mb-4"
        >
          <Typewriter
            options={{
              strings: [`Welcome ${userData?.name || ''}, so you like ${getRandomInterest() || 'learning'}!`],
              autoStart: true,
              loop: false,
              deleteSpeed: 9999999,
              delay: 50,
              cursor: '...',
              wrapperClassName: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400",
              cursorClassName: "text-violet-400 animate-pulse"
            }}
          />
        </motion.h1>
      </motion.div>
    </div>
  )
} 