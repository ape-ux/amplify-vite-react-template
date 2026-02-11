import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Package, FileText, Ship, DollarSign, AlertTriangle, RefreshCw, ArrowRight, Zap } from 'lucide-react'
import { getDashboardStats, getRecentShipments, getLFDAlerts, getAgents } from '../lib/api'
import type { Shipment, Container, Agent } from '../types'

// Based on: FreightFlow Pro Dashboard (Stitch Project 17463332012453534044)
// Theme: DARK, Primary: #137fec, Font: Inter

interface DashboardStats {
  active_shipments: number
  pending_quotes: number
  containers_at_risk: number
  revenue_mtd: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    active_shipments: 0,
    pending_quotes: 0,
    containers_at_risk: 0,
    revenue_mtd: 0,
  })
  const [recentShipments, setRecentShipments] = useState<Shipment[]>([])
  const [lfdAlerts, setLfdAlerts] = useState<Container[]>([])
  const [agents, setAgents] = useState<Agent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  const fetchDashboardData = async () => {
    setIsLoading(true)
    try {
      const [statsData, shipmentsData, alertsData, agentsData] = await Promise.all([
        getDashboardStats(),
        getRecentShipments(5),
        getLFDAlerts(),
        getAgents().catch(() => []),
      ])

      setStats(statsData)
      setRecentShipments(Array.isArray(shipmentsData) ? shipmentsData : [])
      setLfdAlerts(Array.isArray(alertsData) ? alertsData : [])
      setAgents(Array.isArray(agentsData) ? agentsData : [])
      setLastRefresh(new Date())
    } catch (error) {
      console.error('Dashboard fetch error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
    // Refresh every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000)
    return () => clearInterval(interval)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </p>
        </div>
        <button
          onClick={fetchDashboardData}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-surface-secondary border border-slate-700 rounded-xl text-slate-300 hover:bg-surface-tertiary transition disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Shipments"
          value={stats.active_shipments}
          icon={<Package className="w-6 h-6" />}
          iconBg="bg-primary/20"
          iconColor="text-primary"
          href="/ape-ux/shipments"
          loading={isLoading}
        />
        <StatCard
          title="Pending Quotes"
          value={stats.pending_quotes}
          icon={<FileText className="w-6 h-6" />}
          iconBg="bg-accent-purple/20"
          iconColor="text-accent-purple"
          href="/ape-ux/quotes"
          loading={isLoading}
        />
        <StatCard
          title="Containers at Risk"
          value={stats.containers_at_risk}
          icon={<AlertTriangle className="w-6 h-6" />}
          iconBg="bg-accent-orange/20"
          iconColor="text-accent-orange"
          href="/ape-ux/containers"
          loading={isLoading}
          alert={stats.containers_at_risk > 0}
        />
        <StatCard
          title="Revenue (MTD)"
          value={formatCurrency(stats.revenue_mtd)}
          icon={<DollarSign className="w-6 h-6" />}
          iconBg="bg-accent-green/20"
          iconColor="text-accent-green"
          href="/ape-ux/analytics"
          loading={isLoading}
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Shipments */}
        <div className="lg:col-span-2 bg-surface-secondary/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-accent-green rounded-full animate-pulse"></span>
              Recent Shipments
            </h2>
            <Link 
              to="/ape-ux/shipments"
              className="text-sm text-primary hover:text-primary-hover flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-4 bg-surface-tertiary/30 rounded-xl animate-pulse">
                  <div className="h-4 bg-surface-tertiary rounded w-3/4 mb-2" />
                  <div className="h-3 bg-surface-tertiary rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : recentShipments.length > 0 ? (
            <div className="space-y-3">
              {recentShipments.map((shipment) => (
                <ShipmentRow key={shipment.id} shipment={shipment} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              <Ship className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No recent shipments</p>
              <Link to="/ape-ux/rate-shop" className="text-primary hover:text-primary-hover text-sm">
                Get a quote →
              </Link>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-surface-secondary/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent-orange" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'New Quote', icon: '➕', color: 'from-primary to-primary-hover', href: '/ape-ux/rate-shop' },
                { label: 'Track Container', icon: '🔍', color: 'from-accent-purple to-purple-700', href: '/ape-ux/containers' },
                { label: 'Create Booking', icon: '📋', color: 'from-accent-green to-green-700', href: '/ape-ux/bookings' },
                { label: 'Upload Docs', icon: '📤', color: 'from-accent-orange to-orange-700', href: '/ape-ux/documents' },
              ].map((action) => (
                <Link
                  key={action.label}
                  to={action.href}
                  className={`p-4 bg-gradient-to-br ${action.color} rounded-xl text-white font-medium hover:opacity-90 transition-opacity text-center`}
                >
                  <span className="text-2xl block mb-1">{action.icon}</span>
                  <span className="text-sm">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* AI Agents Status */}
          <div className="bg-surface-secondary/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <h2 className="text-lg font-semibold text-white mb-4">🤖 AI Agents</h2>
            <div className="space-y-3">
              {isLoading ? (
                [1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-3 bg-surface-tertiary/30 rounded-xl animate-pulse">
                    <div className="h-4 bg-surface-tertiary rounded w-2/3" />
                  </div>
                ))
              ) : agents.length > 0 ? (
                agents.slice(0, 4).map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between p-3 bg-surface-tertiary/30 rounded-xl">
                    <span className="text-slate-300">{agent.name}</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        agent.status === 'active' ? 'bg-accent-green animate-pulse' :
                        agent.status === 'error' ? 'bg-accent-red' : 'bg-accent-orange'
                      }`} />
                      <span className="text-slate-400 text-sm capitalize">{agent.status}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-slate-400 text-sm">
                  No agents configured
                </div>
              )}
            </div>
          </div>

          {/* LFD Alerts */}
          {lfdAlerts.length > 0 && (
            <div className="bg-accent-orange/10 border border-accent-orange/30 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-accent-orange mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                LFD Alerts
              </h2>
              <div className="space-y-2">
                {lfdAlerts.slice(0, 3).map((container) => (
                  <div key={container.id} className="flex items-center justify-between p-3 bg-surface-primary/50 rounded-xl">
                    <span className="text-white font-mono text-sm">{container.container_number}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      container.risk_level === 'critical' ? 'bg-accent-red/20 text-accent-red' :
                      container.risk_level === 'warning' ? 'bg-accent-orange/20 text-accent-orange' :
                      'bg-accent-green/20 text-accent-green'
                    }`}>
                      {container.free_time_remaining} days left
                    </span>
                  </div>
                ))}
                {lfdAlerts.length > 3 && (
                  <Link to="/ape-ux/containers" className="block text-center text-accent-orange text-sm hover:underline">
                    +{lfdAlerts.length - 3} more alerts
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Stat Card Component
function StatCard({ 
  title, 
  value, 
  icon, 
  iconBg, 
  iconColor, 
  href,
  loading = false,
  alert = false,
}: {
  title: string
  value: string | number
  icon: React.ReactNode
  iconBg: string
  iconColor: string
  href: string
  loading?: boolean
  alert?: boolean
}) {
  return (
    <Link
      to={href}
      className={`bg-surface-secondary/50 backdrop-blur-sm rounded-2xl p-6 border transition-colors hover:border-primary/50 ${
        alert ? 'border-accent-orange/50' : 'border-slate-700/50'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${iconBg} ${iconColor} rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
        {alert && (
          <span className="w-3 h-3 bg-accent-orange rounded-full animate-pulse" />
        )}
      </div>
      <p className="text-slate-400 text-sm mb-1">{title}</p>
      {loading ? (
        <div className="h-8 bg-surface-tertiary rounded w-1/2 animate-pulse" />
      ) : (
        <p className="text-3xl font-bold text-white">{value}</p>
      )}
    </Link>
  )
}

// Shipment Row Component
function ShipmentRow({ shipment }: { shipment: Shipment }) {
  const statusColors: Record<string, string> = {
    pending: 'bg-slate-500/20 text-slate-400',
    booked: 'bg-primary/20 text-primary',
    picked_up: 'bg-accent-purple/20 text-accent-purple',
    in_transit: 'bg-status-info/20 text-status-info',
    delivered: 'bg-accent-green/20 text-accent-green',
    exception: 'bg-accent-red/20 text-accent-red',
  }

  return (
    <Link
      to={`/ape-ux/shipments/${shipment.id}`}
      className="flex items-center justify-between p-4 bg-surface-tertiary/30 rounded-xl hover:bg-surface-tertiary/50 transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
          <Package className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-white font-medium font-mono">{shipment.carrier_pro_number || shipment.id}</p>
          <p className="text-slate-400 text-sm">
            {shipment.origin_address?.city}, {shipment.origin_address?.state} → {shipment.destination_address?.city}, {shipment.destination_address?.state}
          </p>
        </div>
      </div>
      <div className="text-right">
        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[shipment.status] || statusColors.pending}`}>
          {shipment.status.replace('_', ' ')}
        </span>
        <p className="text-slate-500 text-xs mt-1">{shipment.carrier_name}</p>
      </div>
    </Link>
  )
}
