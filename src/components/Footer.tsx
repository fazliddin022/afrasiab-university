import logo from '../assets/logo.png'

export default function Footer() {
  return (
    <footer
      className="px-6 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-4"
      style={{ backgroundColor: '#0D0C08', borderTop: '1px solid #2E2818' }}
    >
      <img src={logo} alt="Afrasiab University" className="w-28 opacity-80" />
      <p className="text-sm text-center md:text-right" style={{ color: '#B8AF9A' }}>
        © 2026 Afrasiab University. Barcha huquqlar himoyalangan.
      </p>
    </footer>
  )
}