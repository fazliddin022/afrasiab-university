import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AboutStats from '../components/AboutStats'
import Faculties from '../components/Faculties'
import Admission from '../components/Admission'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutStats />
      <Faculties />
      <Admission />
      <Footer />
    </div>
  )
}