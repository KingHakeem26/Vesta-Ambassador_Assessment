import { useState } from 'react'

function FallbackUser() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 bg-vesta-green rounded flex items-center justify-center">
        <span className="text-black font-bold text-xs">V</span>
      </div>
      <span className="text-white font-semibold text-lg tracking-wide">VESTA</span>
    </div>
  )
}

function FallbackAdmin() {
  return <span className="font-bold text-gray-900 text-lg">VESTA</span>
}

export default function VestaLogo({ width = 120, variant = 'user' }) {
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return variant === 'admin' ? <FallbackAdmin /> : <FallbackUser />
  }

  return (
    <img
      src="/vesta-logo.png"
      alt="Vesta"
      style={{ width, height: 'auto' }}
      onError={() => setImgError(true)}
    />
  )
}
