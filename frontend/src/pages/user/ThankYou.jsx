import VestaLogo from '../../components/VestaLogo'

export default function ThankYou() {
  const name = sessionStorage.getItem('userName') || ''
  const email = sessionStorage.getItem('userEmail') || ''

  return (
    <div className="min-h-screen bg-vesta-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-vesta-card border border-white/[0.08] rounded-xl p-8 text-center">
          <div className="flex justify-center mb-8">
            <VestaLogo />
          </div>

          {/* Checkmark */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full border-4 border-vesta-green flex items-center justify-center">
              <svg className="w-10 h-10 text-vesta-green" fill="none" viewBox="0 0 24 24">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-white text-2xl font-semibold mb-4">
            Assessment submitted
          </h1>

          <p className="text-vesta-muted text-sm leading-relaxed mb-8">
            Thank you for completing the Vesta Ambassador Assessment. Your multiple choice answers
            have been automatically scored. Your written answers will be reviewed by the Vesta team
            and your final result will be communicated to you shortly.
          </p>

          {(name || email) && (
            <div className="bg-vesta-surface border border-white/[0.08] rounded-lg px-4 py-3">
              {name && <p className="text-vesta-muted text-sm font-medium">{name}</p>}
              {email && <p className="text-vesta-faint text-xs mt-0.5">{email}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
