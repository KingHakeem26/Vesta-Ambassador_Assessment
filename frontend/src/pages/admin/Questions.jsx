import { useState, useEffect } from 'react'
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors
} from '@dnd-kit/core'
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates,
  useSortable, verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  getQuestions, deleteQuestion, reorderQuestions,
  getSettings, updateSettings,
  getSections, createSection, deleteSection
} from '../../lib/api'
import AdminLayout from '../../components/admin/AdminLayout'
import AddQuestionModal from '../../components/admin/AddQuestionModal'
import EditQuestionModal from '../../components/admin/EditQuestionModal'

function SortableRow({ question, index, onDelete, onEdit }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: question.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }
  return (
    <tr ref={setNodeRef} style={style} className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-3 py-3 w-8">
        <button {...attributes} {...listeners} className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing select-none">
          ⠿
        </button>
      </td>
      <td className="px-3 py-3 text-sm text-gray-500 w-10">{index + 1}</td>
      <td className="px-3 py-3 text-sm text-gray-800 max-w-xs">
        <span>{question.text.slice(0, 80)}{question.text.length > 80 ? '…' : ''}</span>
      </td>
      <td className="px-3 py-3">
        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
          question.type === 'mc' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
        }`}>
          {question.type === 'mc' ? 'MC' : 'Type-in'}
        </span>
      </td>
      <td className="px-3 py-3 text-sm text-gray-500">{question.section || '—'}</td>
      <td className="px-3 py-3">
        <div className="flex gap-2">
          <button onClick={() => onEdit(question)} className="text-gray-400 hover:text-blue-600 text-sm" title="Edit">✏️</button>
          <button onClick={() => onDelete(question)} className="text-gray-400 hover:text-red-500 text-sm" title="Delete">🗑️</button>
        </div>
      </td>
    </tr>
  )
}

export default function Questions() {
  const [questions, setQuestions] = useState([])
  const [sections, setSections] = useState([])
  const [timerInput, setTimerInput] = useState(60)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [timerSaved, setTimerSaved] = useState(false)

  // Add section UI state
  const [showAddSection, setShowAddSection] = useState(false)
  const [newSectionName, setNewSectionName] = useState('')
  const [sectionSaving, setSectionSaving] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  async function load() {
    const [qs, settings, secs] = await Promise.all([getQuestions(), getSettings(), getSections()])
    setQuestions(qs)
    setTimerInput(settings?.timer_seconds || 60)
    setSections(secs)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleDragEnd(event) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIdx = questions.findIndex(q => q.id === active.id)
    const newIdx = questions.findIndex(q => q.id === over.id)
    const reordered = arrayMove(questions, oldIdx, newIdx)
    setQuestions(reordered)
    await reorderQuestions(reordered.map(q => q.id))
  }

  async function handleDelete(question) {
    if (!window.confirm(`Delete this question?\n\n"${question.text.slice(0, 80)}…"`)) return
    await deleteQuestion(question.id)
    setQuestions(prev => prev.filter(q => q.id !== question.id))
  }

  async function saveTimer() {
    await updateSettings(Number(timerInput))
    setTimerSaved(true)
    setTimeout(() => setTimerSaved(false), 2000)
  }

  async function handleAddSection() {
    if (!newSectionName.trim()) return
    setSectionSaving(true)
    try {
      await createSection(newSectionName.trim())
      setNewSectionName('')
      setShowAddSection(false)
      const updated = await getSections()
      setSections(updated)
    } finally {
      setSectionSaving(false)
    }
  }

  async function handleDeleteSection(name) {
    if (!window.confirm(`Delete section "${name}"?\n\nQuestions in this section will be moved to "Uncategorized". This cannot be undone.`)) return
    await deleteSection(name)
    await load()
  }

  const mcQuestions = questions.filter(q => q.type === 'mc')
  const typeInQuestions = questions.filter(q => q.type === 'typein')

  // Group MC questions by section preserving order
  const mcBySection = {}
  for (const q of mcQuestions) {
    const s = q.section || 'Uncategorized'
    if (!mcBySection[s]) mcBySection[s] = []
    mcBySection[s].push(q)
  }

  return (
    <AdminLayout>
      <div className="px-8 py-8">
        {/* Timer setting */}
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3 mb-6">
          <span className="text-gray-700 text-sm font-medium">Timer per question:</span>
          <input
            type="number"
            min={5}
            max={300}
            value={timerInput}
            onChange={e => setTimerInput(e.target.value)}
            className="w-20 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <span className="text-gray-500 text-sm">seconds</span>
          <button onClick={saveTimer} className="ml-2 bg-blue-600 text-white rounded px-3 py-1 text-sm hover:bg-blue-700">
            Save
          </button>
          {timerSaved && <span className="text-green-600 text-sm">✓ Saved</span>}
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-gray-900 text-xl font-semibold">
            Questions <span className="text-gray-400 font-normal text-base">({questions.length})</span>
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddSection(v => !v)}
              className="border border-gray-300 text-gray-700 rounded-lg px-4 py-2 text-sm hover:bg-gray-50"
            >
              + Add Section
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700"
            >
              + Add Question
            </button>
          </div>
        </div>

        {/* Add Section inline */}
        {showAddSection && (
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3 mb-4">
            <input
              type="text"
              value={newSectionName}
              onChange={e => setNewSectionName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddSection()}
              placeholder="New section name…"
              autoFocus
              className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handleAddSection}
              disabled={sectionSaving || !newSectionName.trim()}
              className="bg-blue-600 text-white rounded px-3 py-1.5 text-sm hover:bg-blue-700 disabled:opacity-50"
            >
              {sectionSaving ? 'Saving…' : 'Add'}
            </button>
            <button
              onClick={() => { setShowAddSection(false); setNewSectionName('') }}
              className="text-gray-400 hover:text-gray-600 text-sm"
            >
              Cancel
            </button>
          </div>
        )}

        {loading ? (
          <p className="text-gray-400 text-center py-12">Loading…</p>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-3 py-2 w-8"></th>
                    <th className="px-3 py-2 text-xs text-gray-500 text-left w-10">#</th>
                    <th className="px-3 py-2 text-xs text-gray-500 text-left">Question</th>
                    <th className="px-3 py-2 text-xs text-gray-500 text-left">Type</th>
                    <th className="px-3 py-2 text-xs text-gray-500 text-left">Section</th>
                    <th className="px-3 py-2 text-xs text-gray-500 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* MC questions grouped by section */}
                  {Object.entries(mcBySection).map(([sectionName, sectionQs]) => (
                    <>
                      <tr key={`mc-section-${sectionName}`}>
                        <td colSpan={6} className="px-3 py-1.5 bg-blue-50">
                          <div className="flex items-center justify-between">
                            <span className="text-blue-700 text-xs font-semibold uppercase tracking-wide">
                              MC · {sectionName} ({sectionQs.length})
                            </span>
                            {sectionName !== 'Uncategorized' && (
                              <button
                                onClick={() => handleDeleteSection(sectionName)}
                                className="text-gray-400 hover:text-red-500 text-xs"
                                title={`Delete section "${sectionName}"`}
                              >
                                🗑️
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                      <SortableContext items={sectionQs.map(q => q.id)} strategy={verticalListSortingStrategy}>
                        {sectionQs.map((q, i) => (
                          <SortableRow key={q.id} question={q} index={i} onDelete={handleDelete} onEdit={setEditingQuestion} />
                        ))}
                      </SortableContext>
                    </>
                  ))}

                  {/* Type-in section */}
                  {typeInQuestions.length > 0 && (
                    <tr>
                      <td colSpan={6} className="px-3 py-1.5 bg-purple-50">
                        <span className="text-purple-700 text-xs font-semibold uppercase tracking-wide">
                          Written / Type-in ({typeInQuestions.length})
                        </span>
                      </td>
                    </tr>
                  )}
                  <SortableContext items={typeInQuestions.map(q => q.id)} strategy={verticalListSortingStrategy}>
                    {typeInQuestions.map((q, i) => (
                      <SortableRow key={q.id} question={q} index={i} onDelete={handleDelete} onEdit={setEditingQuestion} />
                    ))}
                  </SortableContext>
                </tbody>
              </table>

              {questions.length === 0 && (
                <p className="text-gray-400 text-sm text-center py-12">
                  No questions yet. Click "+ Add Question" to get started.
                </p>
              )}
            </DndContext>
          </div>
        )}
      </div>

      {showAddModal && (
        <AddQuestionModal
          sections={sections}
          onClose={() => setShowAddModal(false)}
          onSaved={() => { setShowAddModal(false); load() }}
        />
      )}

      {editingQuestion && (
        <EditQuestionModal
          question={editingQuestion}
          sections={sections}
          onClose={() => setEditingQuestion(null)}
          onSaved={() => { setEditingQuestion(null); load() }}
        />
      )}
    </AdminLayout>
  )
}
