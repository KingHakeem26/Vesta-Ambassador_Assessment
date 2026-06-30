import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getQuestions, getSettings, submitAnswers } from '../../lib/api'
import QuestionCard from '../../components/user/QuestionCard'
import Timer from '../../components/user/Timer'
import VestaLogo from '../../components/VestaLogo'

export default function Assessment() {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([])
  const [timerTotal, setTimerTotal] = useState(60)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(60)
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  const answersRef = useRef(answers)
  answersRef.current = answers

  useEffect(() => {
    if (!sessionStorage.getItem('submissionId')) {
      navigate('/', { replace: true })
      return
    }
    async function load() {
      try {
        const [qs, settings] = await Promise.all([getQuestions(), getSettings()])
        setQuestions(qs)
        const secs = settings?.timer_seconds || 60
        setTimerTotal(secs)
        setTimeLeft(secs)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [navigate])

  const advanceQuestion = useCallback(() => {
    setCurrentIndex(prev => prev + 1)
  }, [])

  // reset timer when question changes
  useEffect(() => {
    setTimeLeft(timerTotal)
  }, [currentIndex, timerTotal])

  // countdown
  useEffect(() => {
    if (loading || questions.length === 0) return
    if (timeLeft <= 0) return
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(id)
  }, [timeLeft, loading, questions.length])

  async function handleSubmit() {
    if (submitting) return
    setSubmitting(true)
    try {
      const subId = sessionStorage.getItem('submissionId')
      await submitAnswers(subId, answersRef.current)
      navigate('/thankyou')
    } catch {
      setSubmitting(false)
    }
  }

  function handleNext() {
    if (currentIndex >= questions.length - 1) {
      handleSubmit()
    } else {
      advanceQuestion()
    }
  }

  function handleTimerExpire() {
    if (currentIndex >= questions.length - 1) {
      handleSubmit()
    } else {
      advanceQuestion()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-vesta-bg flex items-center justify-center">
        <p className="text-vesta-muted">Loading assessment…</p>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-vesta-bg flex items-center justify-center">
        <p className="text-vesta-muted">No questions found.</p>
      </div>
    )
  }

  const question = questions[currentIndex]
  const total = questions.length
  const progressPct = (currentIndex / total) * 100
  const isLast = currentIndex >= total - 1
  const currentAnswer = answers[question.id]

  return (
    <div className="min-h-screen bg-vesta-bg p-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <VestaLogo />
          <span className="text-vesta-muted text-sm">
            Question {currentIndex + 1} of {total}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-vesta-surface rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-vesta-green rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="bg-vesta-card border border-white/[0.08] rounded-xl p-6">
          {/* Timer */}
          <div className="flex justify-end mb-4">
            <Timer
              key={currentIndex}
              seconds={timeLeft}
              total={timerTotal}
              onExpire={handleTimerExpire}
            />
          </div>

          {/* Section badge */}
          <div className="mb-4">
            <span className="text-vesta-muted text-xs uppercase tracking-wider border border-white/10 rounded px-2 py-0.5">
              {question.section}
            </span>
          </div>

          {/* Question text */}
          <h2 className="text-white font-medium text-base leading-relaxed mb-6">
            {question.text}
          </h2>

          {/* Answer input */}
          <QuestionCard
            question={question}
            answer={currentAnswer}
            onChange={val => setAnswers(prev => ({ ...prev, [question.id]: val }))}
          />

          {/* Next / Submit button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleNext}
              disabled={submitting}
              className="bg-vesta-green text-black font-semibold rounded-lg px-6 py-3 hover:bg-vesta-greenDark transition-colors disabled:opacity-60"
            >
              {submitting ? 'Submitting…' : isLast ? 'Submit Assessment' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
