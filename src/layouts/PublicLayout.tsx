import { Link, Outlet } from 'react-router-dom'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700/50 backdrop-blur-sm fixed w-full z-50 bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold">🦍</span>
              </div>
              <span className="text-xl font-bold text-white">FreightFlow Pro</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="/#features" className="text-slate-300 hover:text-white transition">Features</a>
              <Link to="/pricing" className="text-slate-300 hover:text-white transition">Pricing</Link>
              <a href="/#agents" className="text-slate-300 hover:text-white transition">AI Agents</a>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-slate-300 hover:text-white transition">Login</Link>
              <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-12 px-4 bg-slate-900">
        <div className="max-w-7xl mx-auto text-center text-slate-400 text-sm">
          © 2026 Ape Global. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
