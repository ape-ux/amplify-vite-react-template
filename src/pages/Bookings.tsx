const mockBookings = [
  { id: 'BK-2026-0123', quote: 'QT-2026-0230', customer: 'Acme Corp', carrier: 'TAI', status: 'confirmed', pickup: 'Feb 12', value: '$2,450' },
  { id: 'BK-2026-0122', quote: 'QT-2026-0228', customer: 'TechGlobal', carrier: 'Echo', status: 'pending', pickup: 'Feb 14', value: '$5,200' },
  { id: 'BK-2026-0121', quote: 'QT-2026-0225', customer: 'FastShip', carrier: 'Estes', status: 'confirmed', pickup: 'Feb 10', value: '$890' },
  { id: 'BK-2026-0120', quote: 'QT-2026-0220', customer: 'Global Trade', carrier: 'CHR', status: 'completed', pickup: 'Feb 05', value: '$12,300' },
]

export default function Bookings() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Bookings</h1>
          <p className="text-gray-400">Manage carrier bookings and pickups</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium">
          ➕ New Booking
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Bookings', value: '89', color: 'text-white' },
          { label: 'Pending', value: '12', color: 'text-yellow-400' },
          { label: 'Confirmed', value: '45', color: 'text-green-400' },
          { label: 'This Week', value: '23', color: 'text-blue-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <p className="text-gray-400 text-sm">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700/30">
            <tr>
              <th className="text-left p-4 text-gray-400 font-medium">Booking ID</th>
              <th className="text-left p-4 text-gray-400 font-medium">Quote Ref</th>
              <th className="text-left p-4 text-gray-400 font-medium">Customer</th>
              <th className="text-left p-4 text-gray-400 font-medium">Carrier</th>
              <th className="text-left p-4 text-gray-400 font-medium">Status</th>
              <th className="text-left p-4 text-gray-400 font-medium">Pickup</th>
              <th className="text-left p-4 text-gray-400 font-medium">Value</th>
              <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockBookings.map((booking) => (
              <tr key={booking.id} className="border-t border-gray-700/50 hover:bg-gray-700/30">
                <td className="p-4 font-mono text-blue-400">{booking.id}</td>
                <td className="p-4 font-mono text-gray-400">{booking.quote}</td>
                <td className="p-4 text-white">{booking.customer}</td>
                <td className="p-4 text-gray-300">{booking.carrier}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                    booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>{booking.status}</span>
                </td>
                <td className="p-4 text-gray-300">{booking.pickup}</td>
                <td className="p-4 text-white font-medium">{booking.value}</td>
                <td className="p-4">
                  <button className="text-blue-400 hover:text-blue-300 mr-3">View</button>
                  <button className="text-gray-400 hover:text-white">BOL</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
