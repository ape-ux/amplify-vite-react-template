const agents = [
  { id: 14, name: 'Manager Agent', model: 'Claude Sonnet 4', status: 'orchestrating', tasks: 12, uptime: '99.9%', description: 'Central orchestrator for all agent coordination' },
  { id: 8, name: 'Email Parser', model: 'Xano Free', status: 'processing', tasks: 45, uptime: '99.5%', description: 'Extract shipment data from incoming emails' },
  { id: 9, name: 'Pricing Agent', model: 'Gemini 2.5 Flash', status: 'active', tasks: 89, uptime: '99.8%', description: 'Multi-carrier rate comparison and quoting' },
  { id: 13, name: 'Customer Service', model: 'Claude Sonnet 4', status: 'active', tasks: 23, uptime: '99.7%', description: 'Support inquiries and account management' },
  { id: 15, name: 'Booking Agent', model: 'Claude 3.5 Haiku', status: 'idle', tasks: 34, uptime: '99.6%', description: 'Quote to booking conversion' },
  { id: 16, name: 'Dispatch Agent', model: 'Gemini 2.5 Flash', status: 'monitoring', tasks: 56, uptime: '99.4%', description: 'Tracking, LFD alerts, and exceptions' },
]

export default function Agents() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Agents</h1>
          <p className="text-gray-400">Xano-powered autonomous agents</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium">
          ⚙️ Configure Agents
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
          <p className="text-gray-400 text-sm">Total Agents</p>
          <p className="text-2xl font-bold text-white">8</p>
        </div>
        <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
          <p className="text-green-400 text-sm">Active</p>
          <p className="text-2xl font-bold text-green-400">6</p>
        </div>
        <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
          <p className="text-blue-400 text-sm">Tasks Today</p>
          <p className="text-2xl font-bold text-blue-400">259</p>
        </div>
        <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
          <p className="text-purple-400 text-sm">Avg Response</p>
          <p className="text-2xl font-bold text-purple-400">1.2s</p>
        </div>
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                <p className="text-sm text-gray-400">{agent.model}</p>
              </div>
              <AgentStatus status={agent.status} />
            </div>
            <p className="text-gray-400 text-sm mb-4">{agent.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-xs">Tasks Today</p>
                <p className="text-white font-medium">{agent.tasks}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Uptime</p>
                <p className="text-green-400 font-medium">{agent.uptime}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700/50 flex gap-2">
              <button className="flex-1 px-3 py-2 bg-gray-700/50 text-gray-300 rounded-lg text-sm hover:bg-gray-700">
                View Logs
              </button>
              <button className="flex-1 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30">
                Configure
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AgentStatus({ status }: { status: string }) {
  const config: Record<string, { label: string; color: string; pulse: boolean }> = {
    orchestrating: { label: 'Orchestrating', color: 'bg-purple-500', pulse: true },
    processing: { label: 'Processing', color: 'bg-blue-500', pulse: true },
    active: { label: 'Active', color: 'bg-green-500', pulse: false },
    idle: { label: 'Idle', color: 'bg-yellow-500', pulse: false },
    monitoring: { label: 'Monitoring', color: 'bg-cyan-500', pulse: true },
  }
  const { label, color, pulse } = config[status] || config.idle
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${color} ${pulse ? 'animate-pulse' : ''}`} />
      <span className="text-sm text-gray-400">{label}</span>
    </div>
  )
}
