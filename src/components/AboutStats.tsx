import { useEffect, useRef, useState } from 'react'
import { GraduationCap, Users, BookOpen, Award } from 'lucide-react'

const stats = [
  { icon: Users, target: 12000, suffix: '+', label: 'Talabalar' },
  { icon: BookOpen, target: 48, suffix: '', label: "Yo'nalishlar" },
  { icon: GraduationCap, target: 2400, suffix: '+', label: 'Bitiruvchilar' },
  { icon: Award, target: 94, suffix: '%', label: 'Ishga joylashish' },
]

function useCountUp(target: number, start: boolean, duration = 1400) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    let raf: number
    const startTime = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration])

  return value
}

function StatCard({
  icon: Icon,
  target,
  suffix,
  label,
  start,
  delay,
}: {
  icon: typeof Users
  target: number
  suffix: string
  label: string
  start: boolean
  delay: number
}) {
  const value = useCountUp(target, start)

  return (
    <div
      className={`group stat-card border rounded-xl p-6 ${start ? 'stat-visible' : ''}`}
      style={{
        borderColor: 'var(--border-color)',
        transitionDelay: start ? `${delay}ms` : '0ms',
      }}
    >
      <div
        className="w-11 h-11 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:rotate-6"
        style={{ backgroundColor: 'var(--accent-soft)' }}
      >
        <Icon className="text-[var(--accent)]" size={22} />
      </div>
      <p className="font-display text-2xl md:text-3xl text-[var(--text-primary)] mb-1">
        {value.toLocaleString()}
        {suffix}
      </p>
      <p className="text-[var(--text-secondary)] text-sm">{label}</p>
    </div>
  )
}

export default function AboutStats() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="px-6 md:px-16 py-20 border-t"
      style={{ borderColor: 'var(--border-color)' }}
    >
      <div className="max-w-2xl mb-14">
        <p className="text-[var(--accent)] text-sm mb-3 tracking-wide">Universitet haqida</p>
        <h2 className="font-display text-3xl md:text-4xl text-[var(--text-primary)] mb-4">
          Bilim va tajriba uyg'unlashgan makon
        </h2>
        <p className="text-[var(--text-secondary)] text-base leading-relaxed">
          Afrasiab University 2010-yildan buyon zamonaviy ta'lim standartlarini
          milliy qadriyatlar bilan uyg'unlashtirib, kelajak yetakchilarini tayyorlab kelmoqda.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} start={visible} delay={i * 120} />
        ))}
      </div>
    </section>
  )
}