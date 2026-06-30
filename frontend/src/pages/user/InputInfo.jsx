import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { initSubmission } from '../../lib/api'
import VestaLogo from '../../components/VestaLogo'

export default function InputInfo() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!name.trim()) return setError('Full name is required.')
    if (!email.trim()) return setError('Email address is required.')
    if (!isValidEmail(email)) return setError('Please enter a valid email address.')

    setLoading(true)
    try {
      const data = await initSubmission(name.trim(), email.trim())
      sessionStorage.setItem('submissionId', data.submissionId)
      sessionStorage.setItem('userName', name.trim())
      sessionStorage.setItem('userEmail', email.trim())
      navigate('/disclaimer')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-vesta-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-vesta-card border border-white/[0.08] rounded-xl p-8">
          <div className="mb-8">
            <VestaLogo />
          </div>

          <h1 className="text-white text-2xl font-semibold mb-2">
            Vesta Ambassador Assessment
          </h1>
          <p className="text-vesta-muted text-sm mb-8">
            Enter your details to begin
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-vesta-muted text-sm mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-vesta-surface border border-white/10 text-white rounded-lg px-4 py-3 focus:border-vesta-green focus:outline-none transition-colors placeholder:text-vesta-faint"
              />
            </div>
            <div>
              <label className="block text-vesta-muted text-sm mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-vesta-surface border border-white/10 text-white rounded-lg px-4 py-3 focus:border-vesta-green focus:outline-none transition-colors placeholder:text-vesta-faint"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-vesta-green text-black font-semibold rounded-lg px-6 py-3 hover:bg-vesta-greenDark transition-colors disabled:opacity-60 mt-2"
            >
              {loading ? 'Please wait…' : 'Continue →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
