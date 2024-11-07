'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

const navItems = [
  { icon: '💬', label: 'Chat', id: 'chat' },
  { icon: '🤝', label: 'Collaborative Study', id: 'collaborative-study' },
  { icon: '📰', label: 'Feed', id: 'feed' },
]

const users = [
  { id: 1, name: 'Alice', icon: '👩' },
  { id: 2, name: 'Bob', icon: '👨' },
  { id: 3, name: 'Charlie', icon: '👩' },
]

export default function SocialPage() {
  const [activeSection, setActiveSection] = useState('chat')
  const [activeChat, setActiveChat] = useState<number | null>(null)
  const router = useRouter()

  return (
    <div className="relative min-h-screen">
      {/* Gradient background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/50 via-zinc-900 to-zinc-950" />

      {/* Subtle grid pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* MacOS-like window wrapper */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
        <div className="h-12 bg-zinc-900 border-b border-zinc-800/50 flex items-center px-4 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 flex justify-start">
            <span className="text-violet-400 text-xl font-bold">clio-social</span>
          </div>
          <button
            onClick={() => router.back()}
            className="absolute right-4 text-sm text-violet-400 hover:text-violet-500 transition-colors"
          >
            Go Back
          </button>
        </div>

        {/* Main content area */}
        <div className="flex h-[calc(100%-3rem)] overflow-hidden">
          {/* Sidebar */}
          <div className="rounded-2xl bg-zinc-900/50 backdrop-blur-lg border border-zinc-800/50 w-72">
            <div className="p-4 flex items-center justify-between border-b border-zinc-800/50">
              <h1 className="font-medium text-violet-400">Social</h1>
            </div>

            <div className="p-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-violet-400 hover:bg-zinc-800/50 hover:text-white transition-all mb-1 group ${
                    activeSection === item.id ? 'bg-zinc-800/50 text-white' : ''
                  }`}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main content placeholder */}
          <main className="flex-1 overflow-auto p-4">
            <div className="rounded-2xl bg-zinc-900/50 backdrop-blur-lg border border-zinc-800/50 h-full overflow-auto relative">
              <div className="absolute inset-0 opacity-[0.02]"
                   style={{
                     backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23FFFFFF' stroke-width='1'%3E%3Cpath d='M0 40h40M0 35h40M0 30h40M0 25h40M0 20h40M0 15h40M0 10h40M0 5h40M0 0h40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                     backgroundSize: '20px 20px'
                   }}
              />
              <div className="flex items-center justify-center h-full">
                {activeSection === 'chat' && (
                  <div className="flex flex-wrap gap-4 justify-center">
                    {users.map(user => (
                      <div key={user.id} className="flex flex-col items-center">
                        <button 
                          onClick={() => setActiveChat(user.id)}
                          className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center text-2xl hover:bg-violet-500/30 transition-all"
                        >
                          {user.icon}
                        </button>
                        <span className="text-violet-400 mt-2">{user.name}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeSection === 'collaborative-study' && (
                  <div className="flex flex-wrap gap-4 justify-center">
                    {users.map(user => (
                      <div key={user.id} className="flex flex-col items-center">
                        <button className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center text-2xl hover:bg-violet-500/30 transition-all">
                          {user.icon}
                        </button>
                        <span className="text-violet-400 mt-2">{user.name}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeSection === 'feed' && (
                  <div className="flex flex-col items-center">
                    <div className="flex gap-4 mb-4">
                      {users.map(user => (
                        <button key={user.id} className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center text-2xl hover:bg-violet-500/30 transition-all">
                          {user.icon}
                        </button>
                      ))}
                    </div>
                    <div className="w-full max-w-md space-y-4">
                      <div className="bg-zinc-800/50 rounded-lg p-4">
                        <h2 className="text-violet-400 font-medium">Alice's Post</h2>
                        <p className="text-zinc-300 mt-2">Just finished a great study session!</p>
                      </div>
                      <div className="bg-zinc-800/50 rounded-lg p-4">
                        <h2 className="text-violet-400 font-medium">Bob's Update</h2>
                        <p className="text-zinc-300 mt-2">Collaborative study is the best way to learn!</p>
                      </div>
                    </div>
                  </div>
                )}
                {activeChat !== null && (
                  <div className="w-full max-w-md bg-zinc-800/50 rounded-lg p-4">
                    <h2 className="text-violet-400 font-medium">Chat with {users.find(user => user.id === activeChat)?.name}</h2>
                    <div className="mt-4 space-y-2">
                      <div className="text-zinc-300">User: Hi there!</div>
                      <div className="text-violet-400">You: Hello!</div>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Type a message..." 
                      className="w-full mt-4 bg-zinc-900/50 text-white px-4 py-2 rounded-lg border border-zinc-700/50 focus:outline-none focus:border-violet-500/50"
                    />
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </motion.div>
    </div>
  )
} 