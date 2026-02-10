const mockContainers = [
  { id: 'MSKU1234567', vessel: 'MSC Gulsun', port: 'Long Beach', lfd: 'Feb 12', status: 'at_cfs', riskLevel: 'ok', fees: '$0' },
  { id: 'TCLU7654321', vessel: 'CMA CGM Marco', port: 'LA/LB', lfd: 'Feb 10', status: 'at_pier', riskLevel: 'warning', fees: '$150' },
  { id: 'OOLU9876543', vessel: 'ONE Commitment', port: 'Newark', lfd: 'Feb 09', status: 'overdue', riskLevel: 'critical', fees: '$450' },
  { id: 'CMAU4567890', vessel: 'Evergreen Ever', port: 'Savannah', lfd: 'Feb 15', status: 'en_route', riskLevel: 'ok', fees: '$0' },
  { id: 'HLCU3456789', vessel: 'Hapag Express', port: 'Houston', lfd: 'Feb 18', status: 'discharged', riskLevel: 'ok', fees: '$0' },
]

export default function Containers() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Container Tracking</h1>
          <p className="text-gray-400">STG CFS integration • Last sync: 5 min ago</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-gray-700 text-white rounded-xl">
            🔄 Sync Now
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium">
            ➕ Add Container
          </button>
        </div>
      </div>

      {/* Risk Overview */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
          <p className="text-gray-400 text-sm">Total Containers</p>
          <p className="text-2xl font-bold text-white">156</p>
        </div>
        <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
          <p className="text-green-400 text-sm">✅ On Track</p>
          <p className="text-2xl font-bold text-green-400">128</p>
        </div>
        <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/30">
          <p className="text-yellow-400 text-sm">⚠️ LFD Warning</p>
          <p className="text-2xl font-bold text-yellow-400">18</p>
        </div>
        <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
          <p className="text-red-400 text-sm">🚨 Critical/Overdue</p>
          <p className="text-2xl font-bold text-red-400">10</p>
        </div>
      </div>

      {/* Container List */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700/30">
            <tr>
              <th className="text-left p-4 text-gray-400 font-medium">Container #</th>
              <th className="text-left p-4 text-gray-400 font-medium">Vessel</th>
              <th className="text-left p-4 text-gray-400 font-medium">Port</th>
              <th className="text-left p-4 text-gray-400 font-medium">LFD</th>
              <th className="text-left p-4 text-gray-400 font-medium">Status</th>
              <th className="text-left p-4 text-gray-400 font-medium">Risk</th>
              <th className="text-left p-4 text-gray-400 font-medium">Est. Fees</th>
              <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockContainers.map((container) => (
              <tr key={container.id} className="border-t border-gray-700/50 hover:bg-gray-700/30">
                <td className="p-4 font-mono text-blue-400">{container.id}</td>
                <td className="p-4 text-white">{container.vessel}</td>
                <td className="p-4 text-gray-300">{container.port}</td>
                <td className="p-4 text-gray-300">{container.lfd}</td>
                <td className="p-4"><ContainerStatus status={container.status} /></td>
                <td className="p-4"><RiskBadge level={container.riskLevel} /></td>
                <td className="p-4 text-gray-300">{container.fees}</td>
                <td className="p-4">
                  <button className="text-blue-400 hover:text-blue-300 mr-3">Track</button>
                  <button className="text-gray-400 hover:text-white">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ContainerStatus({ status }: { status: string }) {
  const statusConfig: Record<string, { label: string; color: string }> = {
    en_route: { label: 'En Route', color: 'bg-blue-500/20 text-blue-400' },
    at_pier: { label: 'At Pier', color: 'bg-purple-500/20 text-purple-400' },
    discharged: { label: 'Discharged', color: 'bg-cyan-500/20 text-cyan-400' },
    at_cfs: { label: 'At CFS', color: 'bg-green-500/20 text-green-400' },
    overdue: { label: 'Overdue', color: 'bg-red-500/20 text-red-400' },
  }
  const config = statusConfig[status] || statusConfig.en_route
  return <span className={`text-xs px-2 py-1 rounded-full ${config.color}`}>{config.label}</span>
}

function RiskBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    ok: 'bg-green-500/20 text-green-400',
    warning: 'bg-yellow-500/20 text-yellow-400',
    critical: 'bg-red-500/20 text-red-400',
  }
  const icons: Record<string, string> = { ok: '✅', warning: '⚠️', critical: '🚨' }
  return (
    <span className={`text-xs px-2 py-1 rounded-full ${colors[level]}`}>
      {icons[level]} {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  )
}
