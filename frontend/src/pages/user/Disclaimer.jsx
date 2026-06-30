import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VestaLogo from '../../components/VestaLogo'
import { getQuestionCounts, getSettings } from '../../lib/api'

export default function Disclaimer() {
  const navigate = useNavigate()
  const [counts, setCounts] = useState({ total: '…', mc: '…', typein: '…' })
  const [timerSecs, setTimerSecs] = useState('…')

  useEffect(() => {
    if (!sessionStorage.getItem('submissionId')) {
      navigate('/', { replace: true })
      return
    }
    async function load() {
      try {
        const [c, settings] = await Promise.all([getQuestionCounts(), getSettings()])
        setCounts(c)
        setTimerSecs(settings?.timer_seconds || 60)
      } catch {
        setCounts({ total: '?', mc: '?', typein: '?' })
        setTimerSecs(60)
      }
    }
    load()
  }, [navigate])

  return (
    <div className="min-h-screen bg-vesta-bg flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="bg-vesta-card border border-white/[0.08] rounded-xl p-8">
          <div className="mb-8">
            <VestaLogo />
          </div>

          <h1 className="text-white text-2xl font-semibold mb-2">Before you begin</h1>
          <p className="text-vesta-muted text-sm mb-8">
            Read the following information carefully before starting.
          </p>

          {/* Stat pills — fully dynamic */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { value: counts.total, label: 'Questions' },
              { value: `${timerSecs}s`, label: 'Per question' },
              { value: '60%', label: 'Pass mark' },
            ].map(({ value, label }) => (
              <div key={label} className="bg-vesta-surface border border-white/[0.08] rounded-lg px-4 py-3 text-center">
                <div className="text-vesta-green text-2xl font-bold">{value}</div>
                <div className="text-vesta-muted text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* Purpose */}
          <div className="mb-6">
            <h2 className="text-white font-semibold mb-2">Purpose</h2>
            <p className="text-vesta-muted text-sm leading-relaxed">
              This assessment is designed to verify that you have the foundational knowledge required to represent
              Vesta as an Ambassador. It covers the Ambassador Program, platform usage, NFT transactions, compliance
              regulations, and investment concepts. Passing this assessment confirms that you are equipped to guide
              users accurately and act in line with Vesta's standards.
            </p>
          </div>

          {/* What you'll be doing */}
          <div className="mb-6">
            <h2 className="text-white font-semibold mb-2">What you'll be doing</h2>
            <ul className="text-vesta-muted text-sm space-y-2">
              <li className="flex gap-2">
                <span className="text-vesta-green mt-0.5">•</span>
                <span>
                  Answering <strong className="text-white">{counts.mc}</strong> multiple choice questions — some may have more than one correct answer.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-vesta-green mt-0.5">•</span>
                <span>
                  Answering <strong className="text-white">{counts.typein}</strong> written (type-in) questions at the end of the assessment.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-vesta-green mt-0.5">•</span>
                <span>
                  Each question has a <strong className="text-white">{timerSecs}-second</strong> timer. When the timer runs out, the question moves on automatically.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-vesta-green mt-0.5">•</span>
                <span>You cannot go back to a previous question once submitted.</span>
              </li>
            </ul>
          </div>

          {/* Scoring */}
          <div className="mb-6">
            <h2 className="text-white font-semibold mb-2">Scoring</h2>
            <p className="text-vesta-muted text-sm leading-relaxed">
              Multiple choice answers are scored automatically. Written answers will be reviewed manually by the
              Vesta team. Your final result will be shared with you once the review is complete. A minimum score
              of 60% is required to maintain your Ambassador status.
            </p>
          </div>

          {/* Warning */}
          <div className="bg-amber-950/40 border border-amber-500/30 rounded-lg p-4 mb-8">
            <p className="text-amber-400 text-sm leading-relaxed">
              Ambassadors who do not achieve a passing score may have their Ambassador status reviewed.
              Ensure you are in a quiet environment and ready to focus before starting.
            </p>
          </div>

          <button
            onClick={() => navigate('/assessment')}
            className="w-full bg-vesta-green text-black font-semibold rounded-lg px-6 py-3 hover:bg-vesta-greenDark transition-colors"
          >
            Start Assessment
          </button>
        </div>
      </div>
    </div>
  )
}
