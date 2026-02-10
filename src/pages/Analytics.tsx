export default function Analytics() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400">Business intelligence and reporting</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-gray-700/50 text-white px-4 py-2 rounded-lg border border-gray-600">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
          <button className="px-4 py-2 bg-gray-700 text-white rounded-xl">
            📥 Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Revenue', value: '$1.2M', change: '+18%', positive: true, icon: '💰' },
          { label: 'Shipments', value: '247', change: '+12%', positive: true, icon: '📦' },
          { label: 'Avg Quote Time', value: '2.4 min', change: '-15%', positive: true, icon: '⚡' },
          { label: 'Customer Satisfaction', value: '4.8/5', change: '+0.2', positive: true, icon: '⭐' },
        ].map((kpi, i) => (
          <div key={i} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{kpi.icon}</span>
              <span className={`text-sm ${kpi.positive ? 'text-green-400' : 'text-red-400'}`}>{kpi.change}</span>
            </div>
            <p className="text-gray-400 text-sm">{kpi.label}</p>
            <p className="text-2xl font-bold text-white">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue Trend</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <span className="text-4xl block mb-2">📈</span>
              <p>Chart visualization</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">Shipments by Mode</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <span className="text-4xl block mb-2">🥧</span>
              <p>Chart visualization</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Top Customers</h3>
        <div className="space-y-3">
          {[
            { name: 'Acme Corp', shipments: 45, revenue: '$125,000' },
            { name: 'TechGlobal Inc', shipments: 38, revenue: '$98,000' },
            { name: 'FastShip LLC', shipments: 32, revenue: '$87,000' },
            { name: 'Global Trade Co', shipments: 28, revenue: '$76,000' },
            { name: 'Import Direct', shipments: 25, revenue: '$65,000' },
          ].map((customer, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {i + 1}
                </span>
                <div>
                  <p className="text-white font-medium">{customer.name}</p>
                  <p className="text-gray-400 text-sm">{customer.shipments} shipments</p>
                </div>
              </div>
              <p className="text-white font-medium">{customer.revenue}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
