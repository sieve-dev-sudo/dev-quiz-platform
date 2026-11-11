import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import History from './pages/History'
import Stats from './pages/Stats'
import Analytics from './pages/Analytics'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/history" element={<History />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
