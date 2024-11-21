'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Note {
  id: number
  title: string
  content: string
  date: string
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: 'Physics Notes',
      content: 'Chapter 3: Quantum Mechanics',
      date: '2024-02-20'
    },
    {
      id: 2,
      title: 'Math Formulas',
      content: 'Integration techniques and examples',
      date: '2024-02-21'
    }
  ])
  const [isCreating, setIsCreating] = useState(false)
  const [newNote, setNewNote] = useState({ title: '', content: '' })

  const addNote = () => {
    if (newNote.title && newNote.content) {
      setNotes([
        {
          id: Date.now(),
          title: newNote.title,
          content: newNote.content,
          date: new Date().toISOString().split('T')[0]
        },
        ...notes,
      ])
      setNewNote({ title: '', content: '' })
      setIsCreating(false)
    }
  }

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-6"
        >
          <h1 className="text-3xl font-bold text-white">Notes</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCreating(true)}
            className="px-4 z-40 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
          >
            New Note
          </motion.button>
        </motion.div>

        <AnimatePresence mode="wait">
          {isCreating && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 bg-zinc-900/50 rounded-xl p-6 border border-zinc-800/50 backdrop-blur-lg overflow-hidden"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  placeholder="Note title..."
                  className="w-full bg-zinc-800/50 text-white px-4 py-2 rounded-lg border border-zinc-700/50 focus:outline-none focus:border-blue-500/50 mb-4"
                />
                <textarea
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  placeholder="Note content..."
                  className="w-full h-32 bg-zinc-800/50 text-white px-4 py-2 rounded-lg border border-zinc-700/50 focus:outline-none focus:border-blue-500/50 mb-4 resize-none"
                />
                <div className="flex justify-end gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsCreating(false)}
                    className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addNote}
                    className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                  >
                    Save Note
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div layout className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {notes.map((note) => (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800/50 backdrop-blur-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-1">{note.title}</h2>
                    <p className="text-sm text-zinc-500">{note.date}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, color: '#f87171' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => deleteNote(note.id)}
                    className="text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    Delete
                  </motion.button>
                </div>
                <p className="text-zinc-300">{note.content}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
} 
