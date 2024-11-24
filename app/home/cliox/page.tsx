'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { auth } from '../../../lib/firebase'
import { isPremiumUser } from '../../../lib/utils'
import { useRouter } from 'next/navigation'
import { MessageSquare, ChevronDown, ChevronUp } from 'lucide-react'

// Define types for type safety
type CAType = 'CA1' | 'CA2' | 'CA3';

interface Subject {
  name: string;
  marks: number;
  maxMarks: number;
}

interface CAData {
  subjects: Subject[];
}

// Define the structure for CA data
type CurrentCAType = Record<CAType, CAData>;

const sampleData = {
  college: "Lovely Professional University",
  branch: "Computer Science",
  currentSemester: 5,
  cgpa: 8.75,
  currentCA: {
    CA1: {
      subjects: [
        { name: "English", marks: 28, maxMarks: 30 },
        { name: "PEA", marks: 27, maxMarks: 30 },
        { name: "React", marks: 29, maxMarks: 30 }
      ]
    },
    CA2: {
      subjects: [
        { name: "English", marks: 26, maxMarks: 30 },
        { name: "PEA", marks: 28, maxMarks: 30 },
        { name: "React", marks: 30, maxMarks: 30 }
      ]
    },
    CA3: {
      subjects: [
        { name: "English", marks: 27, maxMarks: 30 },
        { name: "PEA", marks: 29, maxMarks: 30 },
        { name: "React", marks: 28, maxMarks: 30 }
      ]
    }
  } as CurrentCAType,
  semesters: [
    {
      number: 1,
      completed: true,
      subjects: [
        {
          name: "Engineering Mathematics",
          grade: "A",
          credits: 4,
          ca: [
            { marks: 45, maxMarks: 50, date: "2023-08-15" },
            { marks: 42, maxMarks: 50, date: "2023-09-20" }
          ],
          examPapers: [
            { year: "2022", link: "https://example.com/math-2022" },
            { year: "2021", link: "https://example.com/math-2021" }
          ]
        },
        {
          name: "Physics",
          grade: "A+",
          credits: 4,
          ca: [
            { marks: 48, maxMarks: 50, date: "2023-08-16" },
            { marks: 47, maxMarks: 50, date: "2023-09-21" }
          ],
          examPapers: [
            { year: "2022", link: "https://example.com/physics-2022" }
          ]
        }
      ]
    },
    {
      number: 2,
      completed: true,
      subjects: [
        {
          name: "Data Structures",
          grade: "A+",
          credits: 4,
          ca: [
            { marks: 47, maxMarks: 50, date: "2023-12-15" }
          ],
          examPapers: [
            { year: "2022", link: "https://example.com/ds-2022" }
          ]
        },
        {
          name: "Computer Networks",
          grade: "A",
          credits: 4,
          ca: [
            { marks: 45, maxMarks: 50, date: "2023-12-16" }
          ],
          examPapers: [
            { year: "2022", link: "https://example.com/cn-2022" }
          ]
        }
      ]
    },
    {
      number: 3,
      completed: false,
      subjects: [
        {
          name: "Operating Systems",
          grade: "B+",
          credits: 4,
          ca: [
            { marks: 42, maxMarks: 50, date: "2024-03-15" }
          ],
          examPapers: [
            { year: "2023", link: "https://example.com/os-2023" }
          ]
        },
        {
          name: "Database Systems",
          grade: "A",
          credits: 4,
          ca: [
            { marks: 46, maxMarks: 50, date: "2024-03-16" }
          ],
          examPapers: [
            { year: "2023", link: "https://example.com/db-2023" }
          ]
        }
      ]
    }
  ],
  upcomingExam: {
    subject: "PHP",
    type: "ETP",
    date: "2024-11-29",
    syllabus: [
      "PHP Basics and Syntax",
      "Object-Oriented Programming in PHP",
      "Database Integration",
      "Laravel Framework Fundamentals",
      "RESTful API Development",
      "Security Best Practices"
    ]
  }
};

interface EditingSubject {
  ca: CAType;
  index: number;
  currentName: string;
}

const calculateDaysLeft = (dateString: string) => {
  const examDate = new Date(dateString);
  const today = new Date();
  const diffTime = examDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default function ClioXPage() {
  const router = useRouter()
  const [userData, setUserData] = useState(sampleData)
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null)
  const [editingField, setEditingField] = useState<string | null>(null)
  const [showAITutor, setShowAITutor] = useState(false)
  const [editingSubject, setEditingSubject] = useState<EditingSubject | null>(null)
  const [showSyllabus, setShowSyllabus] = useState(false);
  
  const [visibleSections, setVisibleSections] = useState({
    ca: true,
    semesters: true
  })

  useEffect(() => {
    const user = auth.currentUser
    if (user?.email && !isPremiumUser(user.email)) {
      router.push('/premium')
    }
  }, [router])

  const handleEditCollege = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEdit('college', e.currentTarget.value)
      setEditingField(null)
    }
  }

  const handleEdit = (field: string, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }))
    setEditingField(null)
  }

  const handleEditSubject = (ca: CAType, index: number, newName: string) => {
    setUserData(prev => ({
      ...prev,
      currentCA: {
        ...prev.currentCA,
        [ca]: {
          ...prev.currentCA[ca],
          subjects: prev.currentCA[ca].subjects.map((sub, i) => 
            i === index ? { ...sub, name: newName } : sub
          )
        }
      }
    }))
    setEditingSubject(null)
  }

  const toggleSection = (section: 'ca' | 'semesters') => {
    setVisibleSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className="h-full overflow-hidden relative">
      <div className="h-full overflow-y-auto px-8 py-6">
        {/* College Info - Moved to very top */}
        <div className="mb-8">
          {editingField === 'college' ? (
            <input
              type="text"
              defaultValue={userData.college}
              onKeyDown={handleEditCollege}
              className="text-3xl font-bold bg-transparent border-b border-blue-500/50 
                focus:outline-none text-white mb-2 w-full"
              autoFocus
              onBlur={(e) => handleEdit('college', e.target.value)}
            />
          ) : (
            <h1 
              className="text-3xl font-bold text-white mb-2 cursor-pointer hover:text-blue-400 
                transition-colors"
              onClick={() => setEditingField('college')}
            >
              {userData.college}
            </h1>
          )}
          <p className="text-zinc-400">
            {userData.branch} - Semester {userData.currentSemester}
          </p>
        </div>

        {/* Info Cards Section */}
        <div className="flex gap-6 mb-12">
          {/* CGPA Card */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-500/20 to-violet-500/20 
              backdrop-blur-lg rounded-xl p-6 border border-blue-500/20"
          >
            <h2 className="text-xl font-semibold text-blue-400 mb-2">Current CGPA</h2>
            <p className="text-4xl font-bold text-white">{userData.cgpa}</p>
          </motion.div>

          {/* Upcoming Exam Card */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setShowSyllabus(true)}
            className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 
              backdrop-blur-lg rounded-xl p-6 border border-pink-500/20
              cursor-pointer hover:border-pink-500/40 transition-all"
          >
            <h2 className="text-xl font-semibold text-pink-400 mb-2">Upcoming Exam</h2>
            <p className="text-2xl font-bold text-white mb-2">
              {userData.upcomingExam.subject} {userData.upcomingExam.type}
            </p>
            <p className="text-lg text-pink-400">
              {calculateDaysLeft(userData.upcomingExam.date)} days left
            </p>
          </motion.div>
        </div>

        {/* CA Section with Toggle */}
        <div className="mb-8">
          <button 
            onClick={() => toggleSection('ca')}
            className="flex items-center gap-2 text-xl font-bold text-white mb-4 hover:text-blue-400 transition-colors"
          >
            Current CA Marks
            {visibleSections.ca ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          <AnimatePresence>
            {visibleSections.ca && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden"
              >
                {(Object.keys(userData.currentCA) as CAType[]).map((caName) => (
                  <motion.div
                    key={caName}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-zinc-900/50 backdrop-blur-lg rounded-xl p-6 border border-zinc-800/50"
                  >
                    <h3 className="text-xl font-bold text-blue-400 mb-4">{caName}</h3>
                    <div className="space-y-4">
                      {userData.currentCA[caName].subjects.map((subject, index) => (
                        <div key={index} className="bg-zinc-800/50 p-4 rounded-lg">
                          {editingSubject && 
                           editingSubject.ca === caName && 
                           editingSubject.index === index ? (
                            <input
                              type="text"
                              defaultValue={subject.name}
                              autoFocus
                              className="w-full bg-transparent border-b border-blue-500/50 
                                focus:outline-none text-white mb-2"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleEditSubject(caName, index, e.currentTarget.value);
                                }
                              }}
                              onBlur={(e) => handleEditSubject(caName, index, e.currentTarget.value)}
                            />
                          ) : (
                            <div 
                              className="flex justify-between items-center cursor-pointer 
                                hover:text-blue-400 transition-colors"
                              onClick={() => setEditingSubject({
                                ca: caName,
                                index,
                                currentName: subject.name
                              })}
                            >
                              <span className="font-medium text-white">{subject.name}</span>
                              <span className="text-blue-400">
                                {subject.marks}/{subject.maxMarks}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Semesters Section with Toggle */}
        <div className="mb-8">
          <button 
            onClick={() => toggleSection('semesters')}
            className="flex items-center gap-2 text-xl font-bold text-white mb-4 hover:text-blue-400 transition-colors"
          >
            Semester Details
            {visibleSections.semesters ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          <AnimatePresence>
            {visibleSections.semesters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden"
              >
                {userData.semesters.map((semester) => (
                  <motion.div
                    key={semester.number}
                    whileHover={{ scale: 1.02 }}
                    className="bg-zinc-900/50 backdrop-blur-lg rounded-xl p-6 border border-zinc-800/50 
                      cursor-pointer hover:border-blue-500/30 transition-all"
                    onClick={() => setSelectedSemester(semester.number)}
                  >
                    <h2 className="text-xl font-bold text-white mb-4">
                      Semester {semester.number}
                      {semester.completed && 
                        <span className="ml-2 text-green-400 text-sm">(Completed)</span>
                      }
                    </h2>
                    <div className="space-y-2">
                      {semester.subjects.map((subject, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span className="text-zinc-400">{subject.name}</span>
                          <span className={`font-medium ${
                            subject.grade === 'A+' ? 'text-green-400' :
                            subject.grade === 'A' ? 'text-blue-400' :
                            'text-yellow-400'
                          }`}>
                            {subject.grade}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Fixed AI Tutor Button - Smaller and bottom right */}
      <div className="absolute bottom-6 right-6 z-[60]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAITutor(true)}
          className="bg-gradient-to-r from-blue-500 to-violet-500 
            text-white p-3 rounded-full flex items-center justify-center shadow-lg
            hover:shadow-blue-500/20 hover:shadow-xl transition-all group"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 
            transition-all duration-300 ease-in-out whitespace-nowrap">
            Ask AI Tutor
          </span>
        </motion.button>
      </div>

      {/* Modals - Updated for fixed height layout */}
      <AnimatePresence>
        {selectedSemester !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200]"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-zinc-900/90 rounded-xl p-8 max-w-2xl w-full mx-8"
              style={{
                maxHeight: 'calc(100vh - 8rem)',
                overflowY: 'auto'
              }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Semester {selectedSemester} Details
              </h2>
              
              {userData.semesters
                .find(sem => sem.number === selectedSemester)
                ?.subjects.map((subject, idx) => (
                <div key={idx} className="mb-8 last:mb-0">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">{subject.name}</h3>
                  
                  {/* CA Marks */}
                  <div className="mb-4">
                    <h4 className="text-white font-medium mb-2">Continuous Assessment</h4>
                    <div className="space-y-2">
                      {subject.ca.map((assessment, i) => (
                        <div key={i} className="flex justify-between items-center bg-zinc-800/50 p-3 rounded-lg">
                          <span className="text-zinc-300">Test {i + 1}</span>
                          <span className="text-blue-400">{assessment.marks}/{assessment.maxMarks}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Previous Papers */}
                  <div>
                    <h4 className="text-white font-medium mb-2">Previous Year Papers</h4>
                    <div className="space-y-2">
                      {subject.examPapers.map((paper, i) => (
                        <a
                          key={i}
                          href="https://www.studocu.com/in/document/lovely-professional-university/analytical-skills-i/pea305-ete-2022-final-ete-question-paper/45848295"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block bg-zinc-800/50 p-3 rounded-lg text-zinc-300 hover:text-blue-400 
                            transition-colors group flex items-center justify-between"
                        >
                          <span>{paper.year} Question Paper</span>
                          <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            View →
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => setSelectedSemester(null)}
                className="mt-6 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg 
                  hover:bg-blue-500/30 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}

        {showSyllabus && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200]"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-zinc-900/90 rounded-xl p-8 max-w-2xl w-full mx-8"
              style={{
                maxHeight: 'calc(100vh - 8rem)',
                overflowY: 'auto'
              }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {userData.upcomingExam.subject} {userData.upcomingExam.type} Syllabus
                </h2>
                <span className="text-pink-400 font-medium">
                  {calculateDaysLeft(userData.upcomingExam.date)} days left
                </span>
              </div>

              <div className="space-y-3">
                {userData.upcomingExam.syllabus.map((topic, index) => (
                  <a
                    key={index}
                    href="https://www.youtube.com/watch?v=yrFr5PMdk2A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-zinc-800/50 p-4 rounded-lg text-zinc-300 
                      hover:bg-zinc-700/50 hover:text-blue-400 transition-all group"
                  >
                    <div className="flex justify-between items-center">
                      <span>{topic}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400">
                        Watch Tutorial →
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              <button
                onClick={() => setShowSyllabus(false)}
                className="mt-6 px-4 py-2 bg-pink-500/20 text-pink-400 rounded-lg 
                  hover:bg-pink-500/30 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}

        {showAITutor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200]"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-zinc-900/90 rounded-xl p-8 max-w-2xl w-full mx-8"
              style={{
                maxHeight: 'calc(100vh - 8rem)',
                overflowY: 'auto'
              }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">AI Tutor</h2>
              <p className="text-zinc-400 mb-4">
                Ask any questions about your subjects, and I'll help you understand the concepts better.
              </p>
              
              <div className="mb-4 h-64 bg-zinc-800/50 rounded-lg p-4 overflow-y-auto">
                <div className="text-zinc-400">AI Tutor is ready to help...</div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your question..."
                  className="flex-1 bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-4 py-2 
                    text-white focus:outline-none focus:border-blue-500/50"
                />
                <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg 
                  hover:bg-blue-500/30 transition-colors">
                  Send
                </button>
              </div>

              <button
                onClick={() => setShowAITutor(false)}
                className="mt-6 px-4 py-2 bg-zinc-800/50 text-zinc-400 rounded-lg 
                  hover:bg-zinc-700/50 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 