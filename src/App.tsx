import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import LearningSession from './pages/LearningSession'
import ProgressTracker from './pages/ProgressTracker'
import ParentPortal from './pages/ParentPortal'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learn" element={<LearningSession />} />
          <Route path="/progress" element={<ProgressTracker />} />
          <Route path="/parent" element={<ParentPortal />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App