import { ReactNode, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, FileText, Package, Truck, Ship, FileBox, 
  Bot, BarChart3, Settings, MessageSquare, Search, MapPin, 
  User, HelpCircle, Bell, ChevronLeft, ChevronRight, LogOut,
  Menu, X
} from 'lucide-react'

interface DashboardLayoutProps {
  children: ReactNode
  user?: { signInDetails?: { loginId?: string } }
  signOut?: () => void
}

const navigation = [
  { name: 'Dashboard', href: '', icon: LayoutDashboard },
  { name: 'Rate Shop', href: '/rate-shop', icon: Search },
  { name: 'Quotes', href: '/quotes', icon: FileText },
  { name: 'Shipments', href: '/shipments', icon: Package },
  { name: 'Tracking', href: '/tracking', icon: MapPin },
  { name: 'Bookings', href: '/bookings', icon: Truck },
  { name: 'Containers', href: '/containers', icon: Ship },
  { name: 'Documents', href: '/documents', icon: FileBox },
  { name: 'Dispatch', href: '/dispatch', icon: Truck },
  { name: 'AI Agents', href: '/agents', icon: Bot },
  { name: 'Chat', href: '/chat', icon: MessageSquare },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
]

const bottomNav = [
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help', href: '/help', icon: HelpCircle },
]

export default function DashboardLayout({ children, user, signOut }: DashboardLayoutProps) {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (href: string) => {
    const path = location.pathname.replace('/app', '')
    if (href === '') return path === '' || path === '/' || path === '/dashboard'
    return path === href
  }

  const currentPage = [...navigation, ...bottomNav].find(n => isActive(n.href))?.name || 'Dashboard'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 rounded-lg border border-slate-700"
      >
        {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
      </button>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-40
        ${sidebarOpen ? 'w-64' : 'w-20'} 
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        bg-slate-800/80 backdrop-blur-xl border-r border-slate-700/50 
        flex flex-col transition-all duration-300
      `}>
        {/* Logo */}
        <div className="p-4 border-b border-slate-700/50">
          <Link to="/app" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-xl">🦍</span>
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-lg font-bold text-white">FreightFlow</h1>
                <p className="text-xs text-slate-400">Pro Dashboard</p>
              </div>
            )}
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <div className={`text-xs font-medium text-slate-500 uppercase tracking-wider mb-3 ${sidebarOpen ? 'px-3' : 'text-center'}`}>
            {sidebarOpen ? 'Operations' : '•'}
          </div>
          {navigation.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                to={`/app${item.href}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  active
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="p-3 space-y-1 border-t border-slate-700/50">
          <div className={`text-xs font-medium text-slate-500 uppercase tracking-wider mb-3 ${sidebarOpen ? 'px-3' : 'text-center'}`}>
            {sidebarOpen ? 'Account' : '•'}
          </div>
          {bottomNav.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                to={`/app${item.href}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  active
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.name}</span>}
              </Link>
            )
          })}
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden lg:flex items-center justify-center p-3 border-t border-slate-700/50 text-slate-400 hover:text-white transition-colors"
        >
          {sidebarOpen ? (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="ml-2 text-sm">Collapse</span>
            </>
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="pl-10 lg:pl-0">
              <h2 className="text-xl font-semibold text-white">{currentPage}</h2>
              <p className="text-sm text-slate-400">AI-Powered Freight Platform</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-700/50">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="hidden sm:flex items-center gap-2 text-slate-300 text-sm bg-slate-700/50 px-3 py-1.5 rounded-full">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                  {(user?.signInDetails?.loginId || 'U')[0].toUpperCase()}
                </div>
                <span className="max-w-[120px] truncate">{user?.signInDetails?.loginId || 'User'}</span>
              </div>
              <button
                onClick={signOut}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
