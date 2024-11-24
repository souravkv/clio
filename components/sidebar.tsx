'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { auth } from '../lib/firebase'
import { Lock } from 'lucide-react'
import { isPremiumUser } from '../lib/utils'

interface NavItem {
  icon: string
  label: string
  href: string
  premium?: boolean
}

const navItems: NavItem[] = [
  { icon: '📝', label: 'Notes', href: '/home/notes' },
  { icon: '✓', label: 'Todo List', href: '/home/todo' },
  { icon: '🕒', label: 'Timetable', href: '/home/timetable' },
]

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    const checkPremiumStatus = () => {
      const user = auth.currentUser;
      if (user && user.email) {
        setIsPremium(isPremiumUser(user.email));
      }
    };
    
    checkPremiumStatus();
    
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.email) {
        setIsPremium(isPremiumUser(user.email));
      } else {
        setIsPremium(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const premiumNavItems = [
    {
      icon: '🎓',
      label: 'ClioX',
      href: '/home/cliox',
      premium: true
    }
  ]

  return (
    <div className={`rounded-2xl bg-zinc-900/50 backdrop-blur-lg border border-zinc-800/50 transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-72'
    }`}>
      <div className="p-4 flex items-center justify-between border-b border-zinc-800/50">
        <h1 className={`font-medium text-zinc-400 ${isCollapsed ? 'hidden' : 'block'}`}>
          Workspace
        </h1>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 hover:text-white transition-all"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      <div className="p-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:bg-zinc-800/50 hover:text-white transition-all mb-1 group"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
            {!isCollapsed && (
              <span className="font-medium">{item.label}</span>
            )}
          </Link>
        ))}
      </div>

      {premiumNavItems.map((item) => (
        <Link
          key={item.label}
          href={isPremium ? item.href : '/premium'}
          className={`flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white 
            hover:bg-zinc-800/50 transition-colors relative group ${
            !isPremium ? 'opacity-50' : ''
          }`}
        >
          <span className="text-xl">{item.icon}</span>
          <span>{item.label}</span>
          {!isPremium && (
            <Lock className="w-4 h-4 absolute right-4 text-zinc-500 group-hover:text-zinc-400" />
          )}
        </Link>
      ))}
    </div>
  )
}

export default Sidebar 