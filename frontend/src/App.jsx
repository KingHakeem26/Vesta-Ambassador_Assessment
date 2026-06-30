import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import InputInfo from './pages/user/InputInfo'
import Disclaimer from './pages/user/Disclaimer'
import Assessment from './pages/user/Assessment'
import ThankYou from './pages/user/ThankYou'
import Login from './pages/admin/Login'
import Questions from './pages/admin/Questions'
import UserAnswers from './pages/admin/UserAnswers'
import ProtectedRoute from './components/admin/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InputInfo />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/questions" element={
          <ProtectedRoute><Questions /></ProtectedRoute>
        } />
        <Route path="/admin/user-answers" element={
          <ProtectedRoute><UserAnswers /></ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
