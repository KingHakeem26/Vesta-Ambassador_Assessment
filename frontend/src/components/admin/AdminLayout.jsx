import { useNavigate, useLocation } from 'react-router-dom'
import VestaLogo from '../VestaLogo'

const NAV = [
  { label: 'Questions', path: '/admin/questions' },
  { label: 'User Answers', path: '/admin/user-answers' },
]

export default function AdminLayout({ children }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  function logout() {
    sessionStorage.removeItem('adminAuth')
    navigate('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-60 bg-white border-r border-gray-200 flex flex-col z-20">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-100">
          <VestaLogo width={100} variant="admin" />
          <p className="text-gray-400 text-xs mt-1">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV.map(({ label, path }) => {
            const active = pathname === path
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {label}
              </button>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-5 border-t border-gray-100 pt-3">
          <button
            onClick={logout}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-60 flex-1 min-w-0">
        {children}
      </main>
    </div>
  )
}
