import { useState, useEffect } from 'react'
import { getSubmissions, getSubmission } from '../../lib/api'
import AdminLayout from '../../components/admin/AdminLayout'
import ReviewDetail from '../../components/admin/ReviewDetail'

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

export default function UserAnswers() {
  const [tab, setTab] = useState('pending_review')
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  async function load(status) {
    setLoading(true)
    const data = await getSubmissions(status)
    setSubmissions(data)
    setLoading(false)
  }

  useEffect(() => { load(tab) }, [tab])

  async function openReview(sub) {
    const data = await getSubmission(sub.id)
    setSelected(data)
  }

  function handleBack(refreshNeeded) {
    setSelected(null)
    if (refreshNeeded) load(tab)
  }

  if (selected) {
    return (
      <AdminLayout>
        <div className="max-w-3xl mx-auto px-8 py-8">
          <ReviewDetail
            submissionData={selected}
            onBack={handleBack}
            readOnly={selected.submission.status === 'reviewed'}
          />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="px-8 py-8">
        <h1 className="text-gray-900 text-xl font-semibold mb-6">User Answers</h1>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-200 rounded-lg p-1 w-fit">
          {[
            { key: 'pending_review', label: 'Pending Review' },
            { key: 'reviewed', label: 'Reviewed' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                tab === t.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-gray-400 text-center py-12">Loading…</p>
        ) : submissions.length === 0 ? (
          <p className="text-gray-400 text-center py-12">No submissions in this category.</p>
        ) : (
          <div className="space-y-3 max-w-3xl">
            {submissions.map(sub => (
              <div
                key={sub.id}
                className="bg-white border border-gray-200 rounded-lg px-4 py-4 hover:border-gray-300 cursor-pointer"
                onClick={() => openReview(sub)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{sub.name}</p>
                    <p className="text-gray-500 text-sm">{sub.email}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{formatDate(sub.created_at)}</p>
                  </div>
                  <div className="text-right">
                    {tab === 'pending_review' ? (
                      <>
                        <p className="text-gray-700 text-sm font-medium">
                          MC Score: {sub.mc_score ?? '?'} / 50
                        </p>
                        <p className="text-amber-500 text-xs mt-0.5">⏳ Pending review</p>
                      </>
                    ) : (
                      <>
                        <p className="text-gray-700 text-sm font-medium">
                          Final: {sub.final_score}%
                        </p>
                        <p className={`text-sm font-semibold mt-0.5 ${sub.result === 'pass' ? 'text-green-600' : 'text-red-500'}`}>
                          {sub.result === 'pass' ? '✓ PASS' : '✗ FAIL'}
                        </p>
                      </>
                    )}
                    <p className="text-blue-600 text-xs mt-1">Review →</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
