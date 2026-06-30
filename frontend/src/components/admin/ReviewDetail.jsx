import { useState } from 'react'
import { reviewSubmission } from '../../lib/api'

export default function ReviewDetail({ submissionData, onBack, readOnly }) {
  const { submission, questions } = submissionData
  const typeInQuestions = questions.filter(q => q.type === 'typein')
  const mcQuestions = questions.filter(q => q.type === 'mc')
  const [mcOpen, setMcOpen] = useState(false)
  const [grades, setGrades] = useState(() => {
    if (readOnly && submission.typein_grades) {
      const map = {}
      submission.typein_grades.forEach(g => { map[g.questionId] = g.correct })
      return map
    }
    return {}
  })
  const [saving, setSaving] = useState(false)

  const answers = submission.answers || {}
  const gradedCount = Object.keys(grades).length
  const allGraded = gradedCount === typeInQuestions.length

  function toggleGrade(questionId, correct) {
    if (readOnly) return
    setGrades(prev => ({
      ...prev,
      [questionId]: prev[questionId] === correct ? undefined : correct
    }))
  }

  function getGrade(questionId) {
    return grades[questionId]
  }

  async function handleSave() {
    setSaving(true)
    try {
      const typeInGrades = typeInQuestions.map(q => ({
        questionId: q.id,
        correct: grades[q.id] === true
      }))
      await reviewSubmission(submission.id, typeInGrades)
      onBack(true)
    } catch {
      setSaving(false)
    }
  }

  function formatDate(d) {
    return new Date(d).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  function getUserAnswer(question) {
    return answers[question.id]
  }

  return (
    <div>
      {/* Back */}
      <button
        onClick={() => onBack(false)}
        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm mb-6"
      >
        ← Back to list
      </button>

      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-gray-900 font-semibold text-lg">{submission.name}</h2>
            <p className="text-gray-500 text-sm">{submission.email}</p>
            <p className="text-gray-400 text-xs mt-1">Submitted: {formatDate(submission.created_at)}</p>
          </div>
          {readOnly && (
            <div className="text-right">
              <p className="text-gray-700 font-semibold">Final: {submission.final_score}%</p>
              <span className={`text-sm font-medium ${submission.result === 'pass' ? 'text-green-600' : 'text-red-500'}`}>
                {submission.result === 'pass' ? '✓ PASS' : '✗ FAIL'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* MC Block */}
      <div className="bg-white border border-gray-200 rounded-lg mb-6 overflow-hidden">
        <button
          onClick={() => setMcOpen(v => !v)}
          className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
        >
          <span className="font-semibold text-gray-900">
            Multiple Choice — {submission.mc_score ?? '?'} / {mcQuestions.length} correct
          </span>
          <span className="text-gray-400 text-sm">{mcOpen ? '▲' : '▼'}</span>
        </button>

        {mcOpen && (
          <div className="divide-y divide-gray-100">
            {mcQuestions.map((q, idx) => {
              const userAns = getUserAnswer(q)
              const userArr = Array.isArray(userAns) ? userAns : (userAns ? [userAns] : [])
              const correctArr = q.correct_answers || []
              const isCorrect = [...userArr].sort().join(',') === [...correctArr].sort().join(',')

              return (
                <div key={q.id} className="px-4 py-3">
                  <p className="text-gray-700 text-sm font-medium mb-2">
                    {idx + 1}. {q.text}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="text-gray-500">
                      Your answer: <span className="font-medium text-gray-800">{userArr.length ? userArr.join(', ').toUpperCase() : '—'}</span>
                    </span>
                    <span className="text-gray-500">
                      Correct: <span className="font-medium text-gray-800">{correctArr.join(', ').toUpperCase()}</span>
                    </span>
                    <span className={`ml-auto font-semibold ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                      {isCorrect ? '✓' : '✗'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Type-in Block */}
      <div className="bg-white border border-gray-200 rounded-lg mb-6 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">
            Written Answers — {gradedCount} / {typeInQuestions.length} graded
          </h3>
        </div>

        <div className="divide-y divide-gray-100">
          {typeInQuestions.map((q, idx) => {
            const userAnswer = getUserAnswer(q)
            const grade = getGrade(q.id)

            return (
              <div key={q.id} className="px-4 py-4">
                <p className="text-gray-800 text-sm font-medium mb-3">
                  Q{idx + 1}: {q.text}
                </p>

                <div className="mb-3">
                  <p className="text-gray-500 text-xs mb-1 uppercase tracking-wide">User's answer</p>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-800 min-h-[60px]">
                    {userAnswer || <span className="text-gray-400 italic">No answer provided</span>}
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-blue-600 text-xs mb-1 uppercase tracking-wide">Reference (model answer)</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-gray-700 min-h-[60px]">
                    {q.model_answer}
                  </div>
                </div>

                {!readOnly && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleGrade(q.id, true)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border-2 transition-colors ${
                        grade === true
                          ? 'bg-green-600 border-green-600 text-white'
                          : 'border-green-500 text-green-600 hover:bg-green-50'
                      }`}
                    >
                      ✓ Correct
                    </button>
                    <button
                      onClick={() => toggleGrade(q.id, false)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border-2 transition-colors ${
                        grade === false
                          ? 'bg-red-500 border-red-500 text-white'
                          : 'border-red-400 text-red-500 hover:bg-red-50'
                      }`}
                    >
                      ✗ Incorrect
                    </button>
                  </div>
                )}

                {readOnly && (
                  <div>
                    {(() => {
                      const g = submission.typein_grades?.find(x => x.questionId === q.id)
                      return g ? (
                        <span className={`text-sm font-medium ${g.correct ? 'text-green-600' : 'text-red-500'}`}>
                          {g.correct ? '✓ Marked Correct' : '✗ Marked Incorrect'}
                        </span>
                      ) : null
                    })()}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Save */}
      {!readOnly && (
        <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 sticky bottom-4">
          <p className="text-gray-500 text-sm">
            {gradedCount} / {typeInQuestions.length} written answers graded
          </p>
          <button
            onClick={handleSave}
            disabled={!allGraded || saving}
            className="bg-green-600 text-white rounded-lg px-5 py-2 text-sm font-semibold hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? 'Saving…' : 'Save Review'}
          </button>
        </div>
      )}
    </div>
  )
}
