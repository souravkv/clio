'use client'

import Link from 'next/link'
import { useState } from 'react'

interface NavItem {
  icon: string
  label: string
  href: string
}

const navItems: NavItem[] = [
  { icon: '📝', label: 'Notes', href: '/home/notes' },
  { icon: '✓', label: 'Todo List', href: '/home/todo' },
  { icon: '🕒', label: 'Timetable', href: '/home/timetable' },
]

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

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
    </div>
  )
}

export default Sidebar 