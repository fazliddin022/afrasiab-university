import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, CalendarClock, FileCheck2, ClipboardList } from 'lucide-react'

const steps = [
  { icon: ClipboardList, title: "Ro'yxatdan o'ting", desc: "Ariza va shaxsiy ma'lumotlaringizni to'ldiring" },
  { icon: FileCheck2, title: 'Fan tanlang', desc: 'Matematika, fizika yoki ingliz tilidan birini tanlang' },
  { icon: CalendarClock, title: "Testdan o'ting", desc: "30 ta savoldan iborat qabul testini yakunlang" },
]

export default function Admission() {
  const navigate = useNavigate()
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
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="admission"
      ref={sectionRef}
      className="px-6 md:px-16 py-20 border-t"
      style={{ borderColor: 'var(--border-color)' }}
    >
      <div className="max-w-2xl mb-14">
        <p className="text-[var(--accent)] text-sm mb-3 tracking-wide">Qabul jarayoni</p>
        <h2 className="font-display text-3xl md:text-4xl text-[var(--text-primary)] mb-4">
          3 ta oddiy qadam
        </h2>
        <p className="text-[var(--text-secondary)] text-base leading-relaxed">
          Qabul jarayoni sodda va tezkor — bir necha daqiqada testni boshlashingiz mumkin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        {steps.map(({ icon: Icon, title, desc }, i) => (
          <div
            key={title}
            className={`admission-step border rounded-xl p-6 ${visible ? 'admission-visible' : ''}`}
            style={{
              borderColor: 'var(--border-color)',
              transitionDelay: visible ? `${i * 130}ms` : '0ms',
            }}
          >
            {i < steps.length - 1 && (
              <span className={`admission-connector hidden md:block ${visible ? 'admission-visible' : ''}`} />
            )}
            <span
              className="admission-badge absolute -top-3 -left-3 w-8 h-8 rounded-full text-sm font-medium flex items-center justify-center"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-ink)' }}
            >
              {i + 1}
            </span>
            <Icon className="text-[var(--accent)] mb-4" size={24} />
            <p className="text-[var(--text-primary)] font-medium mb-1">{title}</p>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/subject')}
        className="group inline-flex items-center gap-2 font-medium px-7 py-3.5 rounded-lg transition-colors"
        style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-ink)' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent)')}
      >
        Testni boshlash
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </section>
  )
}