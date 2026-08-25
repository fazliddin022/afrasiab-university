import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { TestProvider } from './context/TestContext'
import IntroSplash from './components/IntroSplash'
import LandingPage from './pages/LandingPage'
import SubjectSelect from './pages/SubjectSelect'
import TestPage from './pages/TestPage'
import ResultPage from './pages/ResultPage'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <ThemeProvider>
      <TestProvider>
        <IntroSplash />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/subject" element={<SubjectSelect />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </TestProvider>
    </ThemeProvider>
  )
}

export default App