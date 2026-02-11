import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, ChevronLeft, ChevronRight, RefreshCw, MapPin, Truck, Package, Calendar, ArrowRight, X } from 'lucide-react'
import { fetchShipments } from '../lib/api'
import type { Shipment } from '../types'

// Based on: FreightFlow Pro Dashboard - Shipments List (Stitch Project 17463332012453534044)
// Theme: DARK, Primary: #137fec, Font: Inter

const STATUS_TABS = [
  { id: 'all', label: 'All', color: 'text-slate-400' },
  { id: 'in_transit', label: 'In Transit', color: 'text-status-info' },
  { id: 'picked_up', label: 'Picked Up', color: 'text-accent-purple' },
  { id: 'booked', label: 'Booked', color: 'text-primary' },
  { id: 'delivered', label: 'Delivered', color: 'text-accent-green' },
  { id: 'exception', label: 'Exception', color: 'text-accent-red' },
]

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  pending: { label: 'Pending', color: 'bg-slate-500/20 text-slate-400' },
  booked: { label: 'Booked', color: 'bg-primary/20 text-primary' },
  picked_up: { label: 'Picked Up', color: 'bg-accent-purple/20 text-accent-purple' },
  in_transit: { label: 'In Transit', color: 'bg-status-info/20 text-status-info' },
  out_for_delivery: { label: 'Out for Delivery', color: 'bg-accent-orange/20 text-accent-orange' },
  delivered: { label: 'Delivered', color: 'bg-accent-green/20 text-accent-green' },
  exception: { label: 'Exception', color: 'bg-accent-red/20 text-accent-red' },
}

const PAGE_SIZE = 20

export default function Shipments() {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [view, setView] = useState<'list' | 'cards'>('list')

  const loadShipments = async () => {
    setIsLoading(true)
    try {
      const response = await fetchShipments({
        status: statusFilter !== 'all' ? statusFilter : undefined,
        limit: PAGE_SIZE,
        offset: (currentPage - 1) * PAGE_SIZE,
      })

      // Handle both array and {items, total} response formats
      let shipmentsData: Shipment[] = []
      let total = 0
      
      if (Array.isArray(response)) {
        shipmentsData = response
        total = response.length
      } else if (response && typeof response === 'object') {
        const resp = response as { items?: Shipment[]; total?: number }
        shipmentsData = resp.items || []
        total = resp.total || shipmentsData.length
      }
      
      setShipments(shipmentsData)
      setTotalCount(total)
    } catch (error) {
      console.error('Failed to load shipments:', error)
      setShipments([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadShipments()
  }, [statusFilter, currentPage])

  // Filter by search query
  const filteredShipments = useMemo(() => {
    if (!searchQuery.trim()) return shipments
    const query = searchQuery.toLowerCase()
    return shipments.filter(s =>
      s.id?.toLowerCase().includes(query) ||
      s.carrier_pro_number?.toLowerCase().includes(query) ||
      s.carrier_name?.toLowerCase().includes(query) ||
      s.origin_address?.city?.toLowerCase().includes(query) ||
      s.destination_address?.city?.toLowerCase().includes(query)
    )
  }, [shipments, searchQuery])

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  // Stats by status
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: totalCount }
    shipments.forEach(s => {
      counts[s.status] = (counts[s.status] || 0) + 1
    })
    return counts
  }, [shipments, totalCount])

  const handleStatusChange = (status: string) => {
    setStatusFilter(status)
    setCurrentPage(1)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Shipments</h1>
          <p className="text-slate-400">Track and manage all shipments</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-surface-tertiary/50 rounded-lg p-1">
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-lg transition-colors ${view === 'list' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}
            >
              📋 List
            </button>
            <button
              onClick={() => setView('cards')}
              className={`px-4 py-2 rounded-lg transition-colors ${view === 'cards' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}
            >
              🃏 Cards
            </button>
          </div>
          <button
            onClick={loadShipments}
            disabled={isLoading}
            className="p-2 bg-surface-secondary border border-slate-700 rounded-lg text-slate-400 hover:text-white transition disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <Link
            to="/ape-ux/rate-shop"
            className="px-4 py-2 bg-gradient-to-r from-primary to-primary-hover text-white rounded-xl font-medium shadow-glow-primary"
          >
            + New Quote
          </Link>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by PRO, carrier, origin, destination..."
            className="w-full bg-surface-secondary border border-slate-700 rounded-xl py-3 pl-12 pr-10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Status Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {STATUS_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleStatusChange(tab.id)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition ${
                statusFilter === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-surface-secondary border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'
              }`}
            >
              {tab.label}
              {statusCounts[tab.id] !== undefined && (
                <span className="ml-2 text-xs opacity-75">({statusCounts[tab.id] || 0})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="bg-surface-secondary/50 rounded-2xl p-6 border border-slate-700/50 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-surface-tertiary rounded-xl" />
                <div className="flex-1">
                  <div className="h-5 bg-surface-tertiary rounded w-1/4 mb-2" />
                  <div className="h-4 bg-surface-tertiary rounded w-1/3" />
                </div>
                <div className="h-6 bg-surface-tertiary rounded w-24" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredShipments.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No shipments found</p>
          <p className="text-sm mt-1">
            {searchQuery ? 'Try a different search term' : 'Get started by creating a quote'}
          </p>
          <Link
            to="/ape-ux/rate-shop"
            className="inline-block mt-4 px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl transition"
          >
            Get a Quote
          </Link>
        </div>
      ) : view === 'list' ? (
        /* Table View */
        <div className="bg-surface-secondary/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-tertiary/30">
                <tr>
                  <th className="text-left p-4 text-slate-400 font-medium text-sm">PRO / ID</th>
                  <th className="text-left p-4 text-slate-400 font-medium text-sm">Route</th>
                  <th className="text-left p-4 text-slate-400 font-medium text-sm">Carrier</th>
                  <th className="text-left p-4 text-slate-400 font-medium text-sm">Status</th>
                  <th className="text-left p-4 text-slate-400 font-medium text-sm">Pickup</th>
                  <th className="text-left p-4 text-slate-400 font-medium text-sm">Delivery</th>
                  <th className="text-left p-4 text-slate-400 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredShipments.map((shipment) => (
                  <tr key={shipment.id} className="border-t border-slate-700/50 hover:bg-surface-tertiary/20 transition">
                    <td className="p-4">
                      <Link to={`/ape-ux/shipments/${shipment.id}`} className="font-mono text-primary hover:text-primary-hover">
                        {shipment.carrier_pro_number || shipment.id.slice(0, 12)}
                      </Link>
                    </td>
                    <td className="p-4 text-slate-300">
                      <div className="flex items-center gap-2">
                        <span>{shipment.origin_address?.city}, {shipment.origin_address?.state}</span>
                        <ArrowRight className="w-4 h-4 text-slate-500" />
                        <span>{shipment.destination_address?.city}, {shipment.destination_address?.state}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-300">{shipment.carrier_name}</td>
                    <td className="p-4">
                      <StatusBadge status={shipment.status} />
                    </td>
                    <td className="p-4 text-slate-400 text-sm">{formatDate(shipment.pickup_date)}</td>
                    <td className="p-4 text-slate-400 text-sm">{formatDate(shipment.delivery_date)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/ape-ux/tracking/${shipment.carrier_pro_number || shipment.id}`}
                          className="text-primary hover:text-primary-hover text-sm"
                        >
                          Track
                        </Link>
                        <Link
                          to={`/ape-ux/shipments/${shipment.id}`}
                          className="text-slate-400 hover:text-white text-sm"
                        >
                          Details
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Cards View */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredShipments.map((shipment) => (
            <Link
              key={shipment.id}
              to={`/ape-ux/shipments/${shipment.id}`}
              className="bg-surface-secondary/50 border border-slate-700/50 rounded-2xl p-6 hover:border-primary/50 transition"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-primary text-sm">{shipment.carrier_pro_number || shipment.id.slice(0, 12)}</span>
                <StatusBadge status={shipment.status} />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent-green mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400">Origin</p>
                    <p className="text-white">{shipment.origin_address?.city}, {shipment.origin_address?.state}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent-red mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400">Destination</p>
                    <p className="text-white">{shipment.destination_address?.city}, {shipment.destination_address?.state}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-400">
                  <Truck className="w-4 h-4" />
                  {shipment.carrier_name}
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar className="w-4 h-4" />
                  {formatDate(shipment.pickup_date)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-slate-400 text-sm">
            Showing {((currentPage - 1) * PAGE_SIZE) + 1} - {Math.min(currentPage * PAGE_SIZE, totalCount)} of {totalCount}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 bg-surface-secondary border border-slate-700 rounded-lg text-slate-400 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Page numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let page: number
                if (totalPages <= 5) {
                  page = i + 1
                } else if (currentPage <= 3) {
                  page = i + 1
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i
                } else {
                  page = currentPage - 2 + i
                }
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg transition ${
                      currentPage === page
                        ? 'bg-primary text-white'
                        : 'bg-surface-secondary border border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    {page}
                  </button>
                )
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 bg-surface-secondary border border-slate-700 rounded-lg text-slate-400 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${config.color}`}>
      {config.label}
    </span>
  )
}

function formatDate(dateString?: string): string {
  if (!dateString) return '—'
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return dateString
  }
}
