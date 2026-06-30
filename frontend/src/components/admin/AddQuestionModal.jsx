import { useState } from 'react'
import { createQuestion } from '../../lib/api'

function newOption() {
  return { id: crypto.randomUUID().slice(0, 4), text: '', correct: false }
}

export default function AddQuestionModal({ sections, onClose, onSaved }) {
  const [step, setStep] = useState('type') // 'type' | 'form'
  const [type, setType] = useState(null)
  const [text, setText] = useState('')
  const [section, setSection] = useState(sections[0] || '')
  const [allowMultiple, setAllowMultiple] = useState(false)
  const [options, setOptions] = useState([newOption(), newOption()])
  const [modelAnswer, setModelAnswer] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function selectType(t) {
    setType(t)
    setStep('form')
  }

  function addOption() {
    if (options.length >= 6) return
    setOptions(prev => [...prev, newOption()])
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

    if (type === 'mc') {
      if (options.some(o => !o.text.trim())) return setError('All option texts are required.')
      if (!options.some(o => o.correct)) return setError('At least one option must be marked correct.')
    } else {
      if (!modelAnswer.trim()) return setError('Model answer is required.')
    }

    setSaving(true)
    try {
      const payload = {
        type,
        section,
        text: text.trim(),
        allowMultiple: type === 'mc' ? allowMultiple : null,
        options: type === 'mc' ? options.map((o, i) => ({ id: String.fromCharCode(97 + i), text: o.text.trim() })) : [],
        correctAnswers: type === 'mc' ? options.reduce((acc, o, i) => o.correct ? [...acc, String.fromCharCode(97 + i)] : acc, []) : [],
        modelAnswer: type === 'typein' ? modelAnswer.trim() : null,
      }
      await createQuestion(payload)
      onSaved()
    } catch {
      setError('Failed to save question.')
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="font-semibold text-gray-900">Add Question</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
        </div>

        <div className="p-6">
          {step === 'type' && (
            <div>
              <p className="text-gray-600 text-sm mb-4">Select question type:</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => selectType('mc')}
                  className="border-2 border-gray-200 rounded-lg p-4 text-left hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <div className="font-semibold text-gray-900">Multiple Choice</div>
                  <div className="text-gray-500 text-xs mt-1">Options with one or more correct answers</div>
                </button>
                <button
                  onClick={() => selectType('typein')}
                  className="border-2 border-gray-200 rounded-lg p-4 text-left hover:border-purple-500 hover:bg-purple-50 transition-colors"
                >
                  <div className="font-semibold text-gray-900">Type-in</div>
                  <div className="text-gray-500 text-xs mt-1">Written response, graded manually</div>
                </button>
              </div>
            </div>
          )}

          {step === 'form' && (
            <div className="space-y-4">
              {/* Question text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Question Text *</label>
                <textarea
                  rows={3}
                  value={text}
                  onChange={e => setText(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter question text..."
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

              {type === 'mc' && (
                <>
                  {/* Allow multiple */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="allowMultiple"
                      checked={allowMultiple}
                      onChange={e => setAllowMultiple(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="allowMultiple" className="text-sm text-gray-700">
                      Allow multiple correct answers
                    </label>
                  </div>

                  {/* Options */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Options *</label>
                    <div className="space-y-2">
                      {options.map((opt, i) => (
                        <div key={opt.id} className="flex items-center gap-2">
                          <span className="text-gray-400 text-sm w-4">{String.fromCharCode(97 + i)}.</span>
                          <input
                            type="text"
                            value={opt.text}
                            onChange={e => updateOption(i, 'text', e.target.value)}
                            placeholder={`Option ${String.fromCharCode(65 + i)}`}
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
                      <button
                        onClick={addOption}
                        className="mt-2 text-blue-600 text-sm hover:underline"
                      >
                        + Add option
                      </button>
                    )}
                  </div>
                </>
              )}

              {type === 'typein' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model Answer *</label>
                  <textarea
                    rows={4}
                    value={modelAnswer}
                    onChange={e => setModelAnswer(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the reference / model answer (shown to admin during review only)..."
                  />
                </div>
              )}

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep('type')}
                  className="flex-1 border border-gray-300 text-gray-700 rounded-lg px-4 py-2 text-sm hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
                >
                  {saving ? 'Saving…' : 'Save Question'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
