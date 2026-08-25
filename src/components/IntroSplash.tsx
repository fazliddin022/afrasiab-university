import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'

export default function IntroSplash() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 700)
    const hideTimer = setTimeout(() => setVisible(false), 1100)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500"
      style={{ backgroundColor: '#0D0C08', opacity: fading ? 0 : 1 }}
    >
      <img
        src={logo}
        alt="Afrasiab University"
        className="w-60 animate-pulse"
        style={{ animation: 'introScale 0.9s ease-out' }}
      />
      <style>{`
        @keyframes introScale {
          0% { transform: scale(0.85); opacity: 0; }
          60% { transform: scale(1.03); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}