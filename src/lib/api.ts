/**
 * Unified API Client for FreightFlow Pro
 * Combines Supabase Auth with Xano Data Layer
 */

import { supabase, signIn, signUp, signOut, getSession, getCurrentUser } from './supabase'
import {
  syncUser,
  setXanoAuthToken,
  getXanoAuthToken,
  clearXanoAuthToken,
  getShipments,
  getShipment,
  getQuotes,
  getQuote,
  createQuote,
  getSpotRates,
  getBookings,
  createBooking,
  getContainers,
  getContainer,
  refreshContainer,
  getDocuments,
  uploadDocument,
  getAgents,
  getAgent,
  runAgent,
  getConversations,
  getMessages,
  sendMessage,
} from './xano'

// Re-export types
export type { RateQuote, Shipment, Quote, Container, Agent, Booking } from '../types'

// ============================================
// Auth - Unified authentication flow
// ============================================

export interface AuthResult {
  user: any
  xanoToken: string
}

/**
 * Login with email/password
 * Authenticates via Supabase, then syncs with Xano
 */
export async function login(email: string, password: string): Promise<AuthResult> {
  // 1. Authenticate with Supabase
  const { user, session } = await signIn(email, password)
  
  if (!user || !session) {
    throw new Error('Authentication failed')
  }
  
  // 2. Sync user with Xano to get Xano auth token
  try {
    const xanoResult = await syncUser(user.id, email)
    if (xanoResult.authToken) {
      setXanoAuthToken(xanoResult.authToken)
    }
    return {
      user: { ...user, ...xanoResult.user },
      xanoToken: xanoResult.authToken,
    }
  } catch (err) {
    console.warn('Xano sync failed, continuing with Supabase session:', err)
    return { user, xanoToken: '' }
  }
}

/**
 * Register a new user
 * Creates Supabase account, then syncs with Xano
 */
export async function register(
  email: string,
  password: string,
  metadata?: { name?: string; company?: string }
): Promise<AuthResult> {
  // 1. Create Supabase account
  const { user } = await signUp(email, password, metadata)
  
  if (!user) {
    throw new Error('Registration failed')
  }
  
  // 2. Sync with Xano
  try {
    const xanoResult = await syncUser(user.id, email)
    if (xanoResult.authToken) {
      setXanoAuthToken(xanoResult.authToken)
    }
    return {
      user: { ...user, ...xanoResult.user },
      xanoToken: xanoResult.authToken,
    }
  } catch (err) {
    console.warn('Xano sync failed after registration:', err)
    return { user, xanoToken: '' }
  }
}

/**
 * Logout - clears both Supabase and Xano sessions
 */
export async function logout(): Promise<void> {
  clearXanoAuthToken()
  await signOut()
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const currentSession = await getSession()
  const xanoToken = getXanoAuthToken()
  return !!(currentSession || xanoToken)
}

/**
 * Get current authenticated user
 */
export async function getUser() {
  const user = await getCurrentUser()
  return user
}

/**
 * Initialize auth state from stored tokens
 */
export async function initAuth(): Promise<AuthResult | null> {
  const session = await getSession()
  const xanoToken = getXanoAuthToken()
  
  if (!session?.user) {
    return null
  }
  
  // If we have a Supabase session but no Xano token, sync
  if (!xanoToken) {
    try {
      const xanoResult = await syncUser(session.user.id, session.user.email!)
      if (xanoResult.authToken) {
        setXanoAuthToken(xanoResult.authToken)
        return { user: session.user, xanoToken: xanoResult.authToken }
      }
    } catch (err) {
      console.warn('Xano sync failed on init:', err)
    }
  }
  
  return { user: session.user, xanoToken: xanoToken || '' }
}

// ============================================
// Dashboard
// ============================================

export interface DashboardStats {
  active_shipments: number
  pending_quotes: number
  containers_at_risk: number
  revenue_mtd: number
}

/**
 * Get dashboard statistics
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  // Aggregate from multiple endpoints
  try {
    const [shipments, quotes, containers] = await Promise.all([
      getShipments({ limit: 1000 }).catch(() => []),
      getQuotes({ status: 'pending', limit: 1000 }).catch(() => []),
      getContainers().catch(() => []),
    ])
    
    const shipmentsArr = Array.isArray(shipments) ? shipments : []
    const quotesArr = Array.isArray(quotes) ? quotes : []
    const containersArr = Array.isArray(containers) ? containers : []
    
    const activeShipments = shipmentsArr.filter((s: any) => 
      ['in_transit', 'picked_up', 'booked', 'In Transit', 'Booked'].includes(s.status)
    ).length
    
    const pendingQuotes = quotesArr.length
    
    const containersAtRisk = containersArr.filter((c: any) => 
      ['warning', 'critical'].includes(c.risk_level)
    ).length
    
    return {
      active_shipments: activeShipments,
      pending_quotes: pendingQuotes,
      containers_at_risk: containersAtRisk,
      revenue_mtd: 0, // Would need analytics endpoint
    }
  } catch (err) {
    console.error('Dashboard stats error:', err)
    return {
      active_shipments: 0,
      pending_quotes: 0,
      containers_at_risk: 0,
      revenue_mtd: 0,
    }
  }
}

/**
 * Get recent shipments for dashboard
 */
export async function getRecentShipments(limit = 5) {
  return getShipments({ limit })
}

/**
 * Get LFD alerts for dashboard
 */
export async function getLFDAlerts() {
  try {
    const containers = await getContainers()
    if (!Array.isArray(containers)) return []
    return containers.filter((c: any) => 
      ['warning', 'critical', 'overdue'].includes(c.risk_level)
    )
  } catch {
    return []
  }
}

// ============================================
// Rate Shopping
// ============================================

export interface RateShopParams {
  origin_zip: string
  destination_zip: string
  weight_lbs: number
  pieces?: number
  freight_class?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  accessorials?: string[]
}

/**
 * Shop for freight rates
 */
export async function shopRates(params: RateShopParams) {
  return getSpotRates(params)
}

// ============================================
// Shipments
// ============================================

export interface ShipmentFilters {
  status?: string
  limit?: number
  offset?: number
  search?: string
}

/**
 * Get shipments with filters
 */
export async function fetchShipments(filters?: ShipmentFilters) {
  return getShipments({
    status: filters?.status,
    limit: filters?.limit || 20,
  })
}

/**
 * Get single shipment by ID
 */
export async function fetchShipment(id: string) {
  return getShipment(id)
}

// ============================================
// Bookings
// ============================================

/**
 * Book a selected rate
 */
export async function bookRate(quoteId: string, pickupDate: string) {
  return createBooking(quoteId, pickupDate)
}

// ============================================
// Re-export data functions for direct use
// ============================================

export {
  // Supabase
  supabase,
  // Quotes
  getQuotes,
  getQuote,
  createQuote,
  // Rates
  getSpotRates,
  // Shipments
  getShipments,
  getShipment,
  // Bookings
  getBookings,
  createBooking,
  // Containers
  getContainers,
  getContainer,
  refreshContainer,
  // Documents
  getDocuments,
  uploadDocument,
  // Agents
  getAgents,
  getAgent,
  runAgent,
  // Chat
  getConversations,
  getMessages,
  sendMessage,
  // Auth tokens
  setXanoAuthToken,
  getXanoAuthToken,
  clearXanoAuthToken,
}
