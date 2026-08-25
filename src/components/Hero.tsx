import { useNavigate } from 'react-router-dom'
import { ArrowRight, ShieldCheck, ChevronDown } from 'lucide-react'
import HeroGridBackground from './HeroGridBackground'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative px-6 md:px-16 pt-16 pb-28 md:pt-24 md:pb-40 overflow-hidden">
      <div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(239,193,90,0.16), transparent 70%)',
          animation: 'floatBlob 9s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-40 -left-10 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(239,193,90,0.10), transparent 70%)',
          animation: 'floatBlob 11s ease-in-out infinite reverse',
        }}
      />
      <HeroGridBackground />

      <div className="relative max-w-3xl">
        <div
          className="inline-flex items-center gap-2 mb-6 text-[var(--accent)] text-sm border rounded-full px-4 py-1.5"
          style={{
            borderColor: 'rgba(239,193,90,0.35)',
            animation: 'fadeUp 0.6s ease-out both',
          }}
        >
          <ShieldCheck size={16} />
          <span>2026 qabul jarayoni ochiq</span>
        </div>

        <h1 className="font-display text-4xl md:text-6xl leading-[1.1] text-[var(--text-primary)] mb-6">
          <span className="block" style={{ animation: 'fadeUp 0.6s ease-out 0.1s both' }}>
            Kelajagingiz shu yerdan
          </span>
          <span className="block" style={{ animation: 'fadeUp 0.6s ease-out 0.25s both' }}>
            <span style={{ color: 'var(--accent)' }}>boshlanadi</span>
          </span>
        </h1>

        <p
          className="text-[var(--text-secondary)] text-base md:text-lg max-w-xl mb-10"
          style={{ animation: 'fadeUp 0.6s ease-out 0.4s both' }}
        >
          Afrasiab University — bilim, martaba va imkoniyatlar chorrahasi.
          Qabul testidan o'tib, o'z yo'nalishingizni tanlang.
        </p>

        <div style={{ animation: 'fadeUp 0.6s ease-out 0.55s both' }}>
          <button
            onClick={() => navigate('/subject')}
            className="group inline-flex items-center gap-2 bg-[var(--accent)] text-[var(--accent-ink)] font-medium px-7 py-3.5 rounded-lg hover:bg-[var(--accent-hover)] transition-colors"
            style={{ animation: 'pulseRing 2.4s ease-out infinite' }}
          >
            Testni boshlash
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-[var(--text-secondary)]"
        style={{ animation: 'fadeUp 0.6s ease-out 0.8s both' }}
      >
        <span className="text-xs tracking-wide">Pastga tushing</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  )
}