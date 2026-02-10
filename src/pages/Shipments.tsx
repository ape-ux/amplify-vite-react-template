import { useState } from 'react'

const mockShipments = [
  { id: 'SH-2026-0891', customer: 'Acme Corp', origin: 'Shanghai', dest: 'Los Angeles', mode: 'Ocean', status: 'in_transit', eta: 'Feb 15', carrier: 'Maersk' },
  { id: 'SH-2026-0890', customer: 'TechGlobal Inc', origin: 'Shenzhen', dest: 'New York', mode: 'Ocean', status: 'customs', eta: 'Feb 12', carrier: 'COSCO' },
  { id: 'SH-2026-0889', customer: 'FastShip LLC', origin: 'Chicago', dest: 'Miami', mode: 'Truck', status: 'delivered', eta: 'Feb 08', carrier: 'XPO' },
  { id: 'SH-2026-0888', customer: 'Global Trade Co', origin: 'Hamburg', dest: 'Houston', mode: 'Ocean', status: 'at_port', eta: 'Feb 18', carrier: 'MSC' },
  { id: 'SH-2026-0887', customer: 'Import Direct', origin: 'Ningbo', dest: 'Long Beach', mode: 'Ocean', status: 'loading', eta: 'Feb 25', carrier: 'ONE' },
]

export default function Shipments() {
  const [view, setView] = useState<'list' | 'map'>('list')

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Shipments</h1>
          <p className="text-gray-400">Track and manage all shipments</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-gray-700/50 rounded-lg p-1">
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-lg transition-colors ${view === 'list' ? 'bg-blue-500 text-white' : 'text-gray-400'}`}
            >
              📋 List
            </button>
            <button
              onClick={() => setView('map')}
              className={`px-4 py-2 rounded-lg transition-colors ${view === 'map' ? 'bg-blue-500 text-white' : 'text-gray-400'}`}
            >
              🗺️ Map
            </button>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium">
            ➕ New Shipment
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Total', value: '247', color: 'text-white' },
          { label: 'In Transit', value: '89', color: 'text-blue-400' },
          { label: 'At Port', value: '34', color: 'text-yellow-400' },
          { label: 'Customs', value: '12', color: 'text-orange-400' },
          { label: 'Delivered', value: '112', color: 'text-green-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <p className="text-gray-400 text-sm">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {view === 'list' ? (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700/30">
              <tr>
                <th className="text-left p-4 text-gray-400 font-medium">Shipment ID</th>
                <th className="text-left p-4 text-gray-400 font-medium">Customer</th>
                <th className="text-left p-4 text-gray-400 font-medium">Route</th>
                <th className="text-left p-4 text-gray-400 font-medium">Mode</th>
                <th className="text-left p-4 text-gray-400 font-medium">Carrier</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                <th className="text-left p-4 text-gray-400 font-medium">ETA</th>
                <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockShipments.map((ship) => (
                <tr key={ship.id} className="border-t border-gray-700/50 hover:bg-gray-700/30">
                  <td className="p-4 font-mono text-blue-400">{ship.id}</td>
                  <td className="p-4 text-white">{ship.customer}</td>
                  <td className="p-4 text-gray-300">{ship.origin} → {ship.dest}</td>
                  <td className="p-4 text-gray-300">{ship.mode}</td>
                  <td className="p-4 text-gray-300">{ship.carrier}</td>
                  <td className="p-4"><ShipmentStatus status={ship.status} /></td>
                  <td className="p-4 text-gray-300">{ship.eta}</td>
                  <td className="p-4">
                    <button className="text-blue-400 hover:text-blue-300 mr-3">Track</button>
                    <button className="text-gray-400 hover:text-white">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 h-[600px] flex items-center justify-center">
          <div className="text-center">
            <span className="text-6xl mb-4 block">🗺️</span>
            <p className="text-gray-400">Interactive map view coming soon</p>
          </div>
        </div>
      )}
    </div>
  )
}

function ShipmentStatus({ status }: { status: string }) {
  const statusConfig: Record<string, { label: string; color: string }> = {
    loading: { label: 'Loading', color: 'bg-purple-500/20 text-purple-400' },
    in_transit: { label: 'In Transit', color: 'bg-blue-500/20 text-blue-400' },
    at_port: { label: 'At Port', color: 'bg-yellow-500/20 text-yellow-400' },
    customs: { label: 'Customs', color: 'bg-orange-500/20 text-orange-400' },
    delivered: { label: 'Delivered', color: 'bg-green-500/20 text-green-400' },
  }
  const config = statusConfig[status] || statusConfig.loading
  return <span className={`text-xs px-2 py-1 rounded-full ${config.color}`}>{config.label}</span>
}
