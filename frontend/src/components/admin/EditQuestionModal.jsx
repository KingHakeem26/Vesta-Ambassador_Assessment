import { useState } from 'react'
import { updateQuestion } from '../../lib/api'

export default function EditQuestionModal({ question, sections, onClose, onSaved }) {
  const isTypein = question.type === 'typein'

  const [text, setText] = useState(question.text || '')
  const [section, setSection] = useState(question.section || (sections[0] || ''))
  const [allowMultiple, setAllowMultiple] = useState(question.allow_multiple || false)
  const [modelAnswer, setModelAnswer] = useState(question.model_answer || '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Build options state: [{id, text, correct}]
  const [options, setOptions] = useState(() => {
    if (isTypein) return []
    const opts = question.options || []
    const correct = question.correct_answers || []
    return opts.map(o => ({ id: o.id, text: o.text, correct: correct.includes(o.id) }))
  })

  function addOption() {
    if (options.length >= 6) return
    const nextId = String.fromCharCode(97 + options.length)
    setOptions(prev => [...prev, { id: nextId, text: '', correct: false }])
  }

  function removeOption(idx) {
    if (options.length <= 2) return
    setOptions(prev => prev.filter((_, i) => i !== idx))
  }

  function updateOption(idx, field, value) {
    setOptions(prev => prev.map((o, i) => i === idx ? { ...o, [field]: value } : o))
  }

  async function handleSave() {
    setError('')
    if (!text.trim()) return setError('Question text is required.')

    if (!isTypein) {
      if (options.some(o => !o.text.trim())) return setError('All option texts are required.')
      if (!options.some(o => o.correct)) return setError('At least one option must be marked correct.')
    } else {
      if (!modelAnswer.trim()) return setError('Model answer is required.')
    }

    setSaving(true)
    try {
      const payload = {
        text: text.trim(),
        section,
        allowMultiple: isTypein ? null : allowMultiple,
        options: isTypein ? [] : options.map((o, i) => ({
          id: String.fromCharCode(97 + i),
          text: o.text.trim()
        })),
        correctAnswers: isTypein ? [] : options.reduce((acc, o, i) =>
          o.correct ? [...acc, String.fromCharCode(97 + i)] : acc, []),
        modelAnswer: isTypein ? modelAnswer.trim() : null,
      }
      await updateQuestion(question.id, payload)
      onSaved()
    } catch {
      setError('Failed to save changes.')
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="font-semibold text-gray-900">Edit Question</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {isTypein ? 'Written / Type-in' : `Multiple Choice${allowMultiple ? ' (multi)' : ''}`}
              {' · '}{section}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
        </div>

        <div className="p-6 space-y-4">
          {/* Question text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Question Text *</label>
            <textarea
              rows={3}
              value={text}
              onChange={e => setText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
            <select
              value={section}
              onChange={e => setSection(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sections.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {!isTypein && (
            <>
              {/* Allow multiple */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="editAllowMultiple"
                  checked={allowMultiple}
                  onChange={e => setAllowMultiple(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="editAllowMultiple" className="text-sm text-gray-700">
                  Allow multiple correct answers
                </label>
              </div>

              {/* Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Options *</label>
                <div className="space-y-2">
                  {options.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm w-4">{String.fromCharCode(97 + i)}.</span>
                      <input
                        type="text"
                        value={opt.text}
                        onChange={e => updateOption(i, 'text', e.target.value)}
                        className="flex-1 border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <label className="flex items-center gap-1 text-xs text-gray-600 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={opt.correct}
                          onChange={e => updateOption(i, 'correct', e.target.checked)}
                        />
                        Correct
                      </label>
                      <button
                        onClick={() => removeOption(i)}
                        disabled={options.length <= 2}
                        className="text-gray-400 hover:text-red-500 disabled:opacity-30 text-lg leading-none"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                {options.length < 6 && (
                  <button onClick={addOption} className="mt-2 text-blue-600 text-sm hover:underline">
                    + Add option
                  </button>
                )}
              </div>
            </>
          )}

          {isTypein && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model Answer *</label>
              <textarea
                rows={4}
                value={modelAnswer}
                onChange={e => setModelAnswer(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Reference answer shown to admin during review..."
              />
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 rounded-lg px-4 py-2 text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
