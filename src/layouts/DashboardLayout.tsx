import { ReactNode, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface DashboardLayoutProps {
  children: ReactNode
  user?: { signInDetails?: { loginId?: string } }
  signOut?: () => void
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: '📊' },
  { name: 'Quotes', href: '/quotes', icon: '💰' },
  { name: 'Shipments', href: '/shipments', icon: '📦' },
  { name: 'Bookings', href: '/bookings', icon: '📋' },
  { name: 'Containers', href: '/containers', icon: '🚢' },
  { name: 'Documents', href: '/documents', icon: '📄' },
  { name: 'Dispatch', href: '/dispatch', icon: '🚚' },
  { name: 'AI Agents', href: '/agents', icon: '🤖' },
  { name: 'Analytics', href: '/analytics', icon: '📈' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
]

export default function DashboardLayout({ children, user, signOut }: DashboardLayoutProps) {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800/50 backdrop-blur-sm border-r border-gray-700/50 flex flex-col transition-all duration-300`}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-lg font-bold text-white">Flow247</h1>
                <p className="text-xs text-gray-400">PRO26</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {sidebarOpen && <span className="font-medium">{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-4 border-t border-gray-700/50 text-gray-400 hover:text-white transition-colors"
        >
          {sidebarOpen ? '← Collapse' : '→'}
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-800/30 backdrop-blur-sm border-b border-gray-700/50 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-white">
                {navigation.find(n => n.href === location.pathname)?.name || 'Dashboard'}
              </h2>
              <p className="text-sm text-gray-400">AI-Powered Freight Platform</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <span className="text-xl">🔔</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <span className="text-gray-300 text-sm bg-gray-700/50 px-3 py-1.5 rounded-full">
                {user?.signInDetails?.loginId || 'User'}
              </span>
              <button
                onClick={signOut}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
