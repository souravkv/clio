'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TimeSlot {
  id: number
  time: string
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
}

export default function TimetablePage() {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      id: 1,
      time: '09:00 AM',
      monday: 'Mathematics',
      tuesday: 'Physics',
      wednesday: 'Chemistry',
      thursday: 'Biology',
      friday: 'English'
    },
    {
      id: 2,
      time: '11:00 AM',
      monday: 'Physics',
      tuesday: 'Chemistry',
      wednesday: 'Mathematics',
      thursday: 'English',
      friday: 'Biology'
    },
    {
      id: 3,
      time: '02:00 PM',
      monday: 'Chemistry',
      tuesday: 'Biology',
      wednesday: 'Physics',
      thursday: 'Mathematics',
      friday: 'Computer Science'
    }
  ])

  const [editingCell, setEditingCell] = useState<{
    id: number
    day: string
  } | null>(null)

  const [editValue, setEditValue] = useState('')

  const startEditing = (id: number, day: string, value: string) => {
    setEditingCell({ id, day })
    setEditValue(value)
  }

  const saveEdit = () => {
    if (editingCell) {
      setTimeSlots(timeSlots.map(slot => {
        if (slot.id === editingCell.id) {
          return {
            ...slot,
            [editingCell.day.toLowerCase()]: editValue
          }
        }
        return slot
      }))
      setEditingCell(null)
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white mb-6"
        >
          Timetable
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800/50 backdrop-blur-lg overflow-x-auto"
        >
          <table className="w-full">
            <thead>
              <tr>
                <motion.th 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="px-4 py-3 text-left text-zinc-400 font-medium"
                >
                  Time
                </motion.th>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, index) => (
                  <motion.th
                    key={day}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + (index * 0.1) }}
                    className="px-4 py-3 text-left text-zinc-400 font-medium"
                  >
                    {day}
                  </motion.th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot, rowIndex) => (
                <motion.tr
                  key={slot.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (rowIndex * 0.1) }}
                  className="border-t border-zinc-800/50"
                >
                  <td className="px-4 py-3 text-zinc-300">{slot.time}</td>
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => (
                    <td key={day} className="px-4 py-3">
                      <AnimatePresence mode="wait">
                        {editingCell?.id === slot.id && editingCell?.day.toLowerCase() === day ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                          >
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onBlur={saveEdit}
                              onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                              className="w-full bg-zinc-800/50 text-white px-2 py-1 rounded border border-zinc-700/50 focus:outline-none focus:border-blue-500/50"
                              autoFocus
                            />
                          </motion.div>
                        ) : (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            onClick={() => startEditing(slot.id, day, slot[day as keyof TimeSlot] as string)}
                            className="text-zinc-300 hover:bg-zinc-800/50 rounded px-2 py-1 cursor-pointer"
                          >
                            {slot[day as keyof TimeSlot]}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  )
} 