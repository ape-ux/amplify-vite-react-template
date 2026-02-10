const mockAlerts = [
  { id: 'ALT-001', container: 'TCLU7654321', type: 'LFD Warning', lfd: 'Feb 10', daysLeft: 2, status: 'pending', priority: 'high' },
  { id: 'ALT-002', container: 'OOLU9876543', type: 'LFD Critical', lfd: 'Feb 09', daysLeft: 0, status: 'escalated', priority: 'critical' },
  { id: 'ALT-003', container: 'MSKU1234567', type: 'Pickup Ready', lfd: 'Feb 12', daysLeft: 4, status: 'scheduled', priority: 'normal' },
  { id: 'ALT-004', container: 'CMAU4567890', type: 'LFD Warning', lfd: 'Feb 11', daysLeft: 3, status: 'pending', priority: 'medium' },
]

export default function Dispatch() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Dispatch & LFD Alerts</h1>
          <p className="text-gray-400">Monitor last free days and schedule pickups</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium">
          🚚 Schedule Pickup
        </button>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
          <p className="text-red-400 text-sm">🚨 Critical</p>
          <p className="text-2xl font-bold text-red-400">3</p>
        </div>
        <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/30">
          <p className="text-orange-400 text-sm">⚠️ High Priority</p>
          <p className="text-2xl font-bold text-orange-400">8</p>
        </div>
        <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/30">
          <p className="text-yellow-400 text-sm">📋 Medium</p>
          <p className="text-2xl font-bold text-yellow-400">15</p>
        </div>
        <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
          <p className="text-green-400 text-sm">✅ Scheduled</p>
          <p className="text-2xl font-bold text-green-400">42</p>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-700/50">
          <h2 className="text-lg font-semibold text-white">Active Alerts</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-700/30">
            <tr>
              <th className="text-left p-4 text-gray-400 font-medium">Container</th>
              <th className="text-left p-4 text-gray-400 font-medium">Alert Type</th>
              <th className="text-left p-4 text-gray-400 font-medium">LFD</th>
              <th className="text-left p-4 text-gray-400 font-medium">Days Left</th>
              <th className="text-left p-4 text-gray-400 font-medium">Priority</th>
              <th className="text-left p-4 text-gray-400 font-medium">Status</th>
              <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockAlerts.map((alert) => (
              <tr key={alert.id} className={`border-t border-gray-700/50 hover:bg-gray-700/30 ${alert.priority === 'critical' ? 'bg-red-500/5' : ''}`}>
                <td className="p-4 font-mono text-blue-400">{alert.container}</td>
                <td className="p-4 text-white">{alert.type}</td>
                <td className="p-4 text-gray-300">{alert.lfd}</td>
                <td className="p-4">
                  <span className={`font-bold ${alert.daysLeft <= 1 ? 'text-red-400' : alert.daysLeft <= 3 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {alert.daysLeft} days
                  </span>
                </td>
                <td className="p-4">
                  <PriorityBadge priority={alert.priority} />
                </td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    alert.status === 'scheduled' ? 'bg-green-500/20 text-green-400' :
                    alert.status === 'escalated' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>{alert.status}</span>
                </td>
                <td className="p-4">
                  <button className="text-green-400 hover:text-green-300 mr-3">Schedule</button>
                  <button className="text-blue-400 hover:text-blue-300">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PriorityBadge({ priority }: { priority: string }) {
  const colors: Record<string, string> = {
    critical: 'bg-red-500/20 text-red-400 border-red-500/30',
    high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    normal: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  }
  return <span className={`text-xs px-2 py-1 rounded-full border ${colors[priority]}`}>{priority}</span>
}
