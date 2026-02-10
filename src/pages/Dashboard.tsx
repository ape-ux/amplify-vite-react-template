export default function Dashboard() {
  return (
    <div className="p-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Active Shipments" value="247" change="+12%" positive icon="📦" />
        <StatCard title="Quotes Today" value="38" change="+5%" positive icon="💰" />
        <StatCard title="Revenue (MTD)" value="$1.2M" change="+18%" positive icon="📈" />
        <StatCard title="Containers" value="156" change="-3%" positive={false} icon="🚢" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Live Activity
          </h2>
          <div className="space-y-3">
            {[
              { action: 'Quote Requested', ref: 'QT-2026-0234', time: '2 min ago', icon: '📝', status: 'pending' },
              { action: 'Shipment Booked', ref: 'SH-2026-0891', time: '15 min ago', icon: '✅', status: 'success' },
              { action: 'Container Arrived', ref: 'MSKU1234567', time: '1 hour ago', icon: '🚢', status: 'info' },
              { action: 'BOL Generated', ref: 'BOL-2026-0567', time: '2 hours ago', icon: '📄', status: 'success' },
              { action: 'LFD Alert', ref: 'CNT-8827364', time: '3 hours ago', icon: '⚠️', status: 'warning' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-white font-medium">{item.action}</p>
                    <p className="text-gray-400 text-sm font-mono">{item.ref}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 text-sm">{item.time}</span>
                  <StatusBadge status={item.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & AI Agents */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <h2 className="text-lg font-semibold text-white mb-4">⚡ Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'New Quote', icon: '➕', color: 'from-blue-500 to-blue-600' },
                { label: 'Track Container', icon: '🔍', color: 'from-purple-500 to-purple-600' },
                { label: 'Create Booking', icon: '📋', color: 'from-green-500 to-green-600' },
                { label: 'Upload Docs', icon: '📤', color: 'from-orange-500 to-orange-600' },
              ].map((action, i) => (
                <button
                  key={i}
                  className={`p-4 bg-gradient-to-br ${action.color} rounded-xl text-white font-medium hover:opacity-90 transition-opacity`}
                >
                  <span className="text-2xl block mb-1">{action.icon}</span>
                  <span className="text-sm">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* AI Agents Status */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <h2 className="text-lg font-semibold text-white mb-4">🤖 AI Agents</h2>
            <div className="space-y-3">
              {[
                { name: 'Manager', status: 'Orchestrating', color: 'bg-purple-500', pulse: true },
                { name: 'Pricing', status: 'Active', color: 'bg-green-500', pulse: false },
                { name: 'Booking', status: 'Active', color: 'bg-green-500', pulse: false },
                { name: 'Dispatch', status: 'Idle', color: 'bg-yellow-500', pulse: false },
              ].map((agent, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-xl">
                  <span className="text-gray-300">{agent.name}</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${agent.color} ${agent.pulse ? 'animate-pulse' : ''}`} />
                    <span className="text-gray-400 text-sm">{agent.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, change, positive, icon }: {
  title: string
  value: string
  change: string
  positive: boolean
  icon: string
}) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl">{icon}</span>
        <span className={`text-sm px-2 py-1 rounded-full ${positive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {change}
        </span>
      </div>
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    success: 'bg-green-500/20 text-green-400',
    warning: 'bg-orange-500/20 text-orange-400',
    info: 'bg-blue-500/20 text-blue-400',
  }
  return (
    <span className={`text-xs px-2 py-1 rounded-full ${colors[status] || colors.info}`}>
      {status}
    </span>
  )
}
