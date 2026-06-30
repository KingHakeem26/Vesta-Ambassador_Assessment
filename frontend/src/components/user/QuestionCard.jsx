export default function QuestionCard({ question, answer, onChange }) {
  if (question.type === 'typein') {
    return (
      <textarea
        rows={5}
        value={answer || ''}
        onChange={e => onChange(e.target.value)}
        placeholder="Type your answer here..."
        className="w-full bg-vesta-surface border border-white/10 text-white rounded-lg px-4 py-3 focus:border-vesta-green focus:outline-none transition-colors placeholder:text-vesta-faint resize-none"
      />
    )
  }

  const isMultiple = question.allow_multiple
  const selectedArr = Array.isArray(answer) ? answer : (answer ? [answer] : [])

  function toggle(optionId) {
    if (isMultiple) {
      if (selectedArr.includes(optionId)) {
        onChange(selectedArr.filter(id => id !== optionId))
      } else {
        onChange([...selectedArr, optionId])
      }
    } else {
      onChange([optionId])
    }
  }

  return (
    <div className="space-y-2">
      {isMultiple && (
        <p className="text-vesta-muted text-xs mb-3">(Select all that apply)</p>
      )}
      {question.options.map(opt => {
        const selected = selectedArr.includes(opt.id)
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => toggle(opt.id)}
            className={`w-full text-left rounded-lg p-4 border transition-all ${
              selected
                ? 'border-vesta-green bg-vesta-green/15 text-vesta-green'
                : 'bg-vesta-card border-white/[0.08] text-white hover:border-vesta-green/50 hover:bg-vesta-green/5'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className={`w-5 h-5 rounded-${isMultiple ? 'sm' : 'full'} border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                selected ? 'border-vesta-green bg-vesta-green' : 'border-white/30'
              }`}>
                {selected && (
                  <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 12 12">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </span>
              <span className="text-sm leading-relaxed">{opt.text}</span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
