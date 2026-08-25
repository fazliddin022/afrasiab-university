import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type Subject = 'math' | 'physics' | 'english'

export const TOTAL_TEST_SECONDS = 30 * 60 // 30 daqiqa

interface TestContextType {
  subject: Subject | null
  setSubject: (s: Subject) => void
  answers: Record<number, number>
  setAnswer: (questionIndex: number, optionIndex: number) => void
  currentIndex: number
  setCurrentIndex: (i: number) => void
  startTime: number | null
  resetTest: () => void
}

const TestContext = createContext<TestContextType | undefined>(undefined)
const STORAGE_KEY = 'afrasiab-test-progress'

export function TestProvider({ children }: { children: ReactNode }) {
  const [subject, setSubjectState] = useState<Subject | null>(null)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setSubjectState(parsed.subject ?? null)
        setAnswers(parsed.answers ?? {})
        setCurrentIndex(parsed.currentIndex ?? 0)
        setStartTime(parsed.startTime ?? null)
      } catch {
        // buzilgan ma'lumot, e'tiborsiz qoldiramiz
      }
    }
  }, [])

  useEffect(() => {
    if (subject) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ subject, answers, currentIndex, startTime })
      )
    }
  }, [subject, answers, currentIndex, startTime])

  const setSubject = (s: Subject) => {
    setSubjectState(s)
    setAnswers({})
    setCurrentIndex(0)
    setStartTime(Date.now())
  }

  const setAnswer = (questionIndex: number, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }))
  }

  const resetTest = () => {
    setSubjectState(null)
    setAnswers({})
    setCurrentIndex(0)
    setStartTime(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <TestContext.Provider
      value={{ subject, setSubject, answers, setAnswer, currentIndex, setCurrentIndex, startTime, resetTest }}
    >
      {children}
    </TestContext.Provider>
  )
}

export function useTest() {
  const ctx = useContext(TestContext)
  if (!ctx) throw new Error('useTest must be used within TestProvider')
  return ctx
}