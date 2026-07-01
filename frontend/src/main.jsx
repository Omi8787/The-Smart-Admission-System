import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import HomePage from './HomePage.jsx'
import StudentDetails from './StudentDetails.jsx'
import EligibilityPage from './EligibilityPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/student-details" element={<StudentDetails />} />
        <Route path="/result" element={<EligibilityPage />} />
      </Routes>
    </HashRouter>
  </StrictMode>
)