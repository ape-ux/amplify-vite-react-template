import { useState } from 'react'
import { Search, MapPin, Truck, Clock, Package, CheckCircle2, AlertTriangle, ArrowRight, Calendar, Building2 } from 'lucide-react'

// Based on: Shipments Tracking Screen (Stitch Project 1084471273319105416)
// Theme: DARK, Font: MANROPE, Accent: #1269e2

interface TrackingEvent {
  id: string
  timestamp: Date
  location: string
  status: string
  description: string
}

interface ShipmentDetails {
  proNumber: string
  status: 'in_transit' | 'delivered' | 'exception' | 'pending'
  carrier: string
  service: string
  origin: { city: string; state: string; zip: string }
  destination: { city: string; state: string; zip: string }
  weight: number
  pieces: number
  pickupDate: Date
  estimatedDelivery: Date
  actualDelivery?: Date
  events: TrackingEvent[]
}

const mockShipment: ShipmentDetails = {
  proNumber: 'TAI-2026-001234',
  status: 'in_transit',
  carrier: 'TAI Freight',
  service: 'Standard LTL',
  origin: { city: 'Los Angeles', state: 'CA', zip: '90210' },
  destination: { city: 'New York', state: 'NY', zip: '10001' },
  weight: 2500,
  pieces: 4,
  pickupDate: new Date('2026-02-08'),
  estimatedDelivery: new Date('2026-02-12'),
  events: [
    { id: '1', timestamp: new Date('2026-02-10T14:30:00'), location: 'Chicago, IL', status: 'in_transit', description: 'Departed facility' },
    { id: '2', timestamp: new Date('2026-02-10T08:15:00'), location: 'Chicago, IL', status: 'in_transit', description: 'Arrived at terminal' },
    { id: '3', timestamp: new Date('2026-02-09T18:45:00'), location: 'Denver, CO', status: 'in_transit', description: 'In transit to next facility' },
    { id: '4', timestamp: new Date('2026-02-09T06:00:00'), location: 'Denver, CO', status: 'in_transit', description: 'Departed facility' },
    { id: '5', timestamp: new Date('2026-02-08T22:30:00'), location: 'Phoenix, AZ', status: 'in_transit', description: 'Arrived at terminal' },
    { id: '6', timestamp: new Date('2026-02-08T10:00:00'), location: 'Los Angeles, CA', status: 'picked_up', description: 'Picked up from shipper' },
  ],
}

const statusConfig = {
  in_transit: { color: 'text-blue-400', bg: 'bg-blue-500/20', icon: Truck, label: 'In Transit' },
  delivered: { color: 'text-green-400', bg: 'bg-green-500/20', icon: CheckCircle2, label: 'Delivered' },
  exception: { color: 'text-red-400', bg: 'bg-red-500/20', icon: AlertTriangle, label: 'Exception' },
  pending: { color: 'text-yellow-400', bg: 'bg-yellow-500/20', icon: Clock, label: 'Pending' },
}

export default function Tracking() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [shipment, setShipment] = useState<ShipmentDetails | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!trackingNumber.trim()) return

    setIsSearching(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setShipment(mockShipment)
    setIsSearching(false)
  }

  const StatusIcon = shipment ? statusConfig[shipment.status].icon : Truck

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Track Shipment</h1>
        <p className="text-slate-400">Enter your PRO number or BOL to track your freight</p>
      </div>

      {/* Search Form */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={trackingNumber}
              onChange={e => setTrackingNumber(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter PRO number, BOL, or Shipment ID"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching || !trackingNumber.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 rounded-xl transition flex items-center gap-2 disabled:opacity-50"
          >
            {isSearching ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Tracking...
              </>
            ) : (
              <>
                Track
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Results */}
      {shipment && (
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 ${statusConfig[shipment.status].bg} rounded-xl flex items-center justify-center`}>
                  <StatusIcon className={`w-7 h-7 ${statusConfig[shipment.status].color}`} />
                </div>
                <div>
                  <p className="text-sm text-slate-400">PRO Number</p>
                  <h2 className="text-xl font-bold text-white">{shipment.proNumber}</h2>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-full ${statusConfig[shipment.status].bg}`}>
                <span className={`font-medium ${statusConfig[shipment.status].color}`}>
                  {statusConfig[shipment.status].label}
                </span>
              </div>
            </div>

            {/* Route Visual */}
            <div className="flex items-center justify-between bg-slate-900/50 rounded-xl p-4 mb-6">
              <div className="text-center">
                <MapPin className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                <p className="font-semibold text-white">{shipment.origin.city}, {shipment.origin.state}</p>
                <p className="text-sm text-slate-500">{shipment.origin.zip}</p>
              </div>
              <div className="flex-1 mx-4 relative">
                <div className="h-1 bg-slate-700 rounded-full">
                  <div className="h-full w-2/3 bg-blue-500 rounded-full" />
                </div>
                <Truck className="absolute top-1/2 left-2/3 -translate-y-1/2 -translate-x-1/2 w-6 h-6 text-blue-400" />
              </div>
              <div className="text-center">
                <MapPin className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                <p className="font-semibold text-white">{shipment.destination.city}, {shipment.destination.state}</p>
                <p className="text-sm text-slate-500">{shipment.destination.zip}</p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Building2 className="w-4 h-4" />
                  <span className="text-sm">Carrier</span>
                </div>
                <p className="font-semibold text-white">{shipment.carrier}</p>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Package className="w-4 h-4" />
                  <span className="text-sm">Weight</span>
                </div>
                <p className="font-semibold text-white">{shipment.weight.toLocaleString()} lbs</p>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Pickup</span>
                </div>
                <p className="font-semibold text-white">{shipment.pickupDate.toLocaleDateString()}</p>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Est. Delivery</span>
                </div>
                <p className="font-semibold text-white">{shipment.estimatedDelivery.toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Event Timeline */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Tracking History</h3>
            <div className="space-y-0">
              {shipment.events.map((event, index) => (
                <div key={event.id} className="flex gap-4">
                  {/* Timeline Line */}
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-slate-600'}`} />
                    {index < shipment.events.length - 1 && (
                      <div className="w-0.5 h-16 bg-slate-700" />
                    )}
                  </div>
                  {/* Event Content */}
                  <div className="pb-6">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-semibold text-white">{event.description}</p>
                      {index === 0 && (
                        <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">Latest</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400">{event.location}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {event.timestamp.toLocaleDateString()} at {event.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!shipment && !isSearching && (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-12 text-center">
          <Truck className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-300 mb-2">Enter a tracking number</h3>
          <p className="text-slate-500">Track your LTL, FTL, or container shipments in real-time</p>
        </div>
      )}
    </div>
  )
}
