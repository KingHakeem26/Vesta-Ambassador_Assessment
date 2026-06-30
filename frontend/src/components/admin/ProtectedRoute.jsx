import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  if (sessionStorage.getItem('adminAuth') !== 'true') {
    return <Navigate to="/admin/login" replace />
  }
  return children
}
