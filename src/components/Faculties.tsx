import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Cpu, Landmark, Stethoscope, Scale, ArrowUpRight } from 'lucide-react'

const faculties = [
  { icon: Cpu, name: 'Kompyuter injiniringi', desc: 'Dasturlash, sun\'iy intellekt, kiberxavfsizlik' },
  { icon: Landmark, name: 'Iqtisodiyot va biznes', desc: 'Moliya, marketing, xalqaro savdo' },
  { icon: Stethoscope, name: 'Tibbiyot', desc: 'Davolash ishi, farmatsiya, stomatologiya' },
  { icon: Scale, name: 'Huquqshunoslik', desc: 'Xalqaro huquq, fuqarolik huquqi' },
]

function handleMove(e: MouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

export default function Faculties() {
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
      id="faculties"
      ref={sectionRef}
      className="px-6 md:px-16 py-20 border-t"
      style={{ borderColor: 'var(--border-color)' }}
    >
      <div className="max-w-2xl mb-14">
        <p className="text-[var(--accent)] text-sm mb-3 tracking-wide">Yo'nalishlar</p>
        <h2 className="font-display text-3xl md:text-4xl text-[var(--text-primary)]">
          Fakultetlar
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {faculties.map(({ icon: Icon, name, desc }, i) => (
          <div
            key={name}
            onMouseMove={handleMove}
            className={`faculty-card flex items-start gap-4 border rounded-xl p-6 ${visible ? 'faculty-visible' : ''}`}
            style={{
              borderColor: 'var(--border-color)',
              transitionDelay: visible ? `${i * 100}ms` : '0ms',
            }}
          >
            <div
              className="relative shrink-0 w-11 h-11 rounded-lg flex items-center justify-center transition-transform duration-300"
              style={{ backgroundColor: 'var(--tile-bg)' }}
            >
              <Icon className="text-[var(--accent)]" size={20} />
            </div>
            <div className="relative flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[var(--text-primary)] font-medium mb-1">{name}</p>
                <ArrowUpRight size={16} className="faculty-arrow text-[var(--accent)] shrink-0" />
              </div>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}