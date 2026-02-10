import { useState } from 'react'

const mockQuotes = [
  { id: 'QT-2026-0234', customer: 'Acme Corp', origin: 'Shanghai', dest: 'Los Angeles', mode: 'Ocean LCL', status: 'pending', amount: '$2,450', created: '2h ago' },
  { id: 'QT-2026-0233', customer: 'TechGlobal Inc', origin: 'Shenzhen', dest: 'New York', mode: 'Ocean FCL', status: 'sent', amount: '$8,900', created: '4h ago' },
  { id: 'QT-2026-0232', customer: 'FastShip LLC', origin: 'Chicago', dest: 'Miami', mode: 'LTL', status: 'accepted', amount: '$1,200', created: '1d ago' },
  { id: 'QT-2026-0231', customer: 'Global Trade Co', origin: 'Hamburg', dest: 'Houston', mode: 'Ocean FCL', status: 'expired', amount: '$12,500', created: '3d ago' },
  { id: 'QT-2026-0230', customer: 'Import Direct', origin: 'Ningbo', dest: 'Long Beach', mode: 'Ocean LCL', status: 'accepted', amount: '$3,100', created: '5d ago' },
]

export default function Quotes() {
  const [filter, setFilter] = useState('all')
  
  const filteredQuotes = filter === 'all' ? mockQuotes : mockQuotes.filter(q => q.status === filter)

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Quotes</h1>
          <p className="text-gray-400">Manage and track your freight quotes</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
          <span>➕</span> New Quote
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {['all', 'pending', 'sent', 'accepted', 'expired'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg capitalize transition-colors ${
              filter === status
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
          <p className="text-gray-400 text-sm">Total Quotes</p>
          <p className="text-2xl font-bold text-white">156</p>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
          <p className="text-gray-400 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-400">23</p>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
          <p className="text-gray-400 text-sm">Accepted</p>
          <p className="text-2xl font-bold text-green-400">89</p>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
          <p className="text-gray-400 text-sm">Conversion Rate</p>
          <p className="text-2xl font-bold text-blue-400">57%</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700/30">
            <tr>
              <th className="text-left p-4 text-gray-400 font-medium">Quote ID</th>
              <th className="text-left p-4 text-gray-400 font-medium">Customer</th>
              <th className="text-left p-4 text-gray-400 font-medium">Route</th>
              <th className="text-left p-4 text-gray-400 font-medium">Mode</th>
              <th className="text-left p-4 text-gray-400 font-medium">Amount</th>
              <th className="text-left p-4 text-gray-400 font-medium">Status</th>
              <th className="text-left p-4 text-gray-400 font-medium">Created</th>
              <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuotes.map((quote) => (
              <tr key={quote.id} className="border-t border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                <td className="p-4 font-mono text-blue-400">{quote.id}</td>
                <td className="p-4 text-white">{quote.customer}</td>
                <td className="p-4 text-gray-300">{quote.origin} → {quote.dest}</td>
                <td className="p-4 text-gray-300">{quote.mode}</td>
                <td className="p-4 text-white font-medium">{quote.amount}</td>
                <td className="p-4">
                  <StatusBadge status={quote.status} />
                </td>
                <td className="p-4 text-gray-400">{quote.created}</td>
                <td className="p-4">
                  <button className="text-blue-400 hover:text-blue-300 mr-3">View</button>
                  <button className="text-gray-400 hover:text-white">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    sent: 'bg-blue-500/20 text-blue-400',
    accepted: 'bg-green-500/20 text-green-400',
    expired: 'bg-gray-500/20 text-gray-400',
  }
  return (
    <span className={`text-xs px-2 py-1 rounded-full capitalize ${colors[status] || colors.pending}`}>
      {status}
    </span>
  )
}
