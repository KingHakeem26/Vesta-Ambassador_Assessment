import { useEffect, useRef } from 'react'

const RADIUS = 28
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function Timer({ seconds, total, onExpire }) {
  const prevSecondsRef = useRef(seconds)

  useEffect(() => {
    prevSecondsRef.current = seconds
  }, [seconds])

  useEffect(() => {
    if (seconds <= 0) {
      onExpire()
    }
  }, [seconds, onExpire])

  const progress = seconds / total
  const dashOffset = CIRCUMFERENCE * (1 - progress)
  const isLow = seconds <= 10
  const color = isLow ? '#ef4444' : '#00d4aa'

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
          <circle
            cx="32" cy="32" r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="4"
          />
          <circle
            cx="32" cy="32" r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
          />
        </svg>
        <span
          className={`absolute inset-0 flex items-center justify-center text-base font-bold ${isLow ? 'text-red-400' : 'text-vesta-green'}`}
        >
          {seconds}
        </span>
      </div>
      <span className="text-vesta-muted text-xs mt-1">seconds</span>
    </div>
  )
}
