import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? "Yorug' rejimga o'tish" : "Qorong'i rejimga o'tish"}
      className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors hover:opacity-80 overflow-hidden"
      style={{ border: '1px solid #2E2818', color: '#F5EFE0' }}
    >
      <span
        key={theme}
        style={{ display: 'inline-flex', animation: 'toggleSpin 0.4s ease' }}
      >
        {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
      </span>
      <style>{`
        @keyframes toggleSpin {
          from { transform: rotate(-90deg) scale(0.5); opacity: 0; }
          to { transform: rotate(0deg) scale(1); opacity: 1; }
        }
      `}</style>
    </button>
  )
}