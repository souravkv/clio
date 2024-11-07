'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Todo {
  id: number
  text: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
}

const priorityColors = {
  low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  high: 'bg-red-500/20 text-red-400 border-red-500/30'
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Complete Math Assignment', completed: false, priority: 'high' },
    { id: 2, text: 'Read Chapter 3 of Physics', completed: true, priority: 'medium' },
    { id: 3, text: 'Prepare for Chemistry Test', completed: false, priority: 'low' },
  ])
  const [newTodo, setNewTodo] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        { id: Date.now(), text: newTodo, completed: false, priority },
        ...todos
      ])
      setNewTodo('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Todo List</h1>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-zinc-400">Filter:</span>
            <button className="px-3 py-1.5 rounded-lg bg-zinc-800/50 text-white hover:bg-zinc-700/50 transition-colors">
              All
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50 transition-colors">
              Active
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50 transition-colors">
              Completed
            </button>
          </div>
        </div>

        <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800/50 backdrop-blur-lg shadow-xl">
          <div className="space-y-4 mb-6">
            <div className="flex gap-4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTodo()}
                placeholder="Add a new task..."
                className="flex-1 bg-zinc-800/50 text-white px-4 py-3 rounded-xl border border-zinc-700/50 focus:outline-none focus:border-blue-500/50 placeholder-zinc-500"
              />
              <div className="flex gap-2">
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                  className="bg-zinc-800/50 text-white px-4 py-3 rounded-xl border border-zinc-700/50 focus:outline-none focus:border-blue-500/50"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <button
                  onClick={addTodo}
                  className="px-6 py-3 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all duration-200 font-medium border border-blue-500/30 hover:border-blue-500/50"
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            <div className="space-y-3">
              {todos.map((todo) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className={`flex items-center gap-4 p-4 rounded-xl border ${
                    todo.completed 
                      ? 'bg-zinc-800/20 border-zinc-700/20' 
                      : `${priorityColors[todo.priority]} bg-opacity-10`
                  }`}
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-colors ${
                      todo.completed 
                        ? 'bg-green-500/20 border-green-500/50' 
                        : 'border-zinc-600 hover:border-zinc-500'
                    }`}
                  >
                    {todo.completed && (
                      <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                      </svg>
                    )}
                  </button>
                  <span className={`flex-1 text-white ${todo.completed ? 'line-through text-zinc-500' : ''}`}>
                    {todo.text}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-md ${priorityColors[todo.priority]}`}>
                    {todo.priority}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="p-1 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
} 