import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import logo from '../assets/logo.png'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '#about', label: 'Universitet haqida' },
  { href: '#faculties', label: 'Fakultetlar' },
  { href: '#admission', label: 'Qabul' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="sticky top-0 z-40 px-6 md:px-16 transition-all duration-300"
      style={{
        backgroundColor: '#0D0C08',
        borderBottom: scrolled ? '1px solid #2E2818' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.35)' : 'none',
        paddingTop: scrolled ? '12px' : '20px',
        paddingBottom: scrolled ? '12px' : '20px',
      }}
    >
      <div className="flex items-center justify-between">
        <Link to="/" onClick={() => setOpen(false)} className="transition-transform duration-300 hover:scale-105">
          <img
            src={logo}
            alt="Afrasiab University"
            className="transition-all duration-300"
            style={{ width: scrolled ? '9rem' : '11rem' }}
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: '#B8AF9A' }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="relative group py-1">
              {l.label}
              <span
                className="absolute left-0 -bottom-0.5 h-px w-0 group-hover:w-full transition-all duration-300"
                style={{ backgroundColor: '#EFC15A' }}
              />
            </a>
          ))}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button onClick={() => setOpen((v) => !v)} style={{ color: '#F5EFE0' }} aria-label={open ? 'Menyuni yopish' : 'Menyuni ochish'}>
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <div
        className="md:hidden absolute left-0 right-0 top-full overflow-hidden transition-all duration-300 ease-out"
        style={{
          backgroundColor: '#0D0C08',
          borderBottom: open ? '1px solid #2E2818' : '1px solid transparent',
          maxHeight: open ? '280px' : '0px',
          opacity: open ? 1 : 0,
          boxShadow: open ? '0 12px 24px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        <div className="flex flex-col gap-5 px-6 py-6 text-base" style={{ color: '#B8AF9A' }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="hover:text-[#EFC15A] transition-colors">{l.label}</a>
          ))}
        </div>
      </div>
    </nav>
  )
}