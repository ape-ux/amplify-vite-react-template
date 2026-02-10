// Xano API Client for FreightFlow Pro
// Instance: FreightFlowAi (xjlt-4ifj-k7qu)

const XANO_BASE = import.meta.env.VITE_XANO_BASE_URL || 'https://xjlt-4ifj-k7qu.n7e.xano.io'

// API Groups - mapped from Flow247
const API_GROUPS = {
  auth: 'api:auth1',
  users: 'api:E1Skvg8o',          // Agents + user management
  quotes: 'api:quotes',
  shipments: 'api:shipments',
  bookings: 'api:bookings',
  containers: 'api:stg',
  documents: 'api:documents',
  agents: 'api:E1Skvg8o',         // AI Agents
  chat: 'api:AKAonta6',           // Chat/conversation
  rates: 'api:rates',
  carriers: 'api:carriers',
  tracking: 'api:tracking',
}

let authToken: string | null = null

export const setXanoAuthToken = (token: string) => {
  authToken = token
  localStorage.setItem('xano_auth_token', token)
}

export const getXanoAuthToken = () => {
  if (!authToken) {
    authToken = localStorage.getItem('xano_auth_token')
  }
  return authToken
}

export const clearXanoAuthToken = () => {
  authToken = null
  localStorage.removeItem('xano_auth_token')
}

// Generic request helper
const xanoRequest = async (
  apiGroup: string,
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  body?: object
) => {
  const token = getXanoAuthToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const url = `${XANO_BASE}/x2/${apiGroup}${endpoint}`
  
  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }))
    throw new Error(error.message || `HTTP ${response.status}`)
  }

  return response.json()
}

// User sync (Supabase → Xano)
export const syncUser = async (supabaseUserId: string, email: string) => {
  return xanoRequest(API_GROUPS.users, '/user/sync', 'POST', {
    supabase_user_id: supabaseUserId,
    email,
  })
}

// Quotes
export const getQuotes = async (filters?: { status?: string; limit?: number }) => {
  const params = new URLSearchParams()
  if (filters?.status) params.append('status', filters.status)
  if (filters?.limit) params.append('limit', String(filters.limit))
  return xanoRequest(API_GROUPS.quotes, `/quotes?${params}`)
}

export const getQuote = async (id: string) => {
  return xanoRequest(API_GROUPS.quotes, `/quotes/${id}`)
}

export const createQuote = async (quoteData: {
  origin_zip: string
  destination_zip: string
  weight_lbs: number
  freight_class?: number
  pallets?: number
  accessorials?: string[]
}) => {
  return xanoRequest(API_GROUPS.quotes, '/quotes', 'POST', quoteData)
}

// Shipments
export const getShipments = async (filters?: { status?: string; limit?: number }) => {
  const params = new URLSearchParams()
  if (filters?.status) params.append('status', filters.status)
  if (filters?.limit) params.append('limit', String(filters.limit))
  return xanoRequest(API_GROUPS.shipments, `/shipments?${params}`)
}

export const getShipment = async (id: string) => {
  return xanoRequest(API_GROUPS.shipments, `/shipments/${id}`)
}

export const trackShipment = async (id: string) => {
  return xanoRequest(API_GROUPS.tracking, `/track/${id}`)
}

// Bookings
export const getBookings = async () => {
  return xanoRequest(API_GROUPS.bookings, '/bookings')
}

export const createBooking = async (quoteId: string, pickupDate: string) => {
  return xanoRequest(API_GROUPS.bookings, '/bookings', 'POST', {
    quote_id: quoteId,
    pickup_date: pickupDate,
  })
}

// Containers (STG)
export const getContainers = async () => {
  return xanoRequest(API_GROUPS.containers, '/cfs/containers')
}

export const getContainer = async (id: string) => {
  return xanoRequest(API_GROUPS.containers, `/cfs/containers/${id}`)
}

export const refreshContainer = async (id: string) => {
  return xanoRequest(API_GROUPS.containers, `/cfs/containers/${id}/refresh`, 'POST')
}

// Documents
export const getDocuments = async (shipmentId: string) => {
  return xanoRequest(API_GROUPS.documents, `/shipments/${shipmentId}/documents`)
}

export const uploadDocument = async (shipmentId: string, file: File, docType: string) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('document_type', docType)
  
  const token = getXanoAuthToken()
  const response = await fetch(
    `${XANO_BASE}/x2/${API_GROUPS.documents}/shipments/${shipmentId}/documents`,
    {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    }
  )
  
  if (!response.ok) throw new Error('Upload failed')
  return response.json()
}

// AI Agents
export const getAgents = async () => {
  return xanoRequest(API_GROUPS.agents, '/agents')
}

export const getAgent = async (id: number) => {
  return xanoRequest(API_GROUPS.agents, `/agent/${id}`)
}

export const runAgent = async (agentId: number, input: string, context?: object) => {
  return xanoRequest(API_GROUPS.agents, `/agent/${agentId}/run`, 'POST', {
    input,
    context,
  })
}

// Chat
export const getConversations = async () => {
  return xanoRequest(API_GROUPS.chat, '/conversations')
}

export const getMessages = async (conversationId: string) => {
  return xanoRequest(API_GROUPS.chat, `/conversations/${conversationId}/messages`)
}

export const sendMessage = async (conversationId: string, message: string) => {
  return xanoRequest(API_GROUPS.chat, `/conversations/${conversationId}/messages`, 'POST', {
    content: message,
  })
}

// Rate shopping
export const getRates = async (params: {
  origin_zip: string
  destination_zip: string
  weight_lbs: number
  freight_class?: number
  carriers?: string[]
}) => {
  return xanoRequest(API_GROUPS.rates, '/rates/shop', 'POST', params)
}

// Carriers
export const getCarriers = async () => {
  return xanoRequest(API_GROUPS.carriers, '/carriers')
}

// Dispatch
export const getDispatchTasks = async () => {
  return xanoRequest(API_GROUPS.containers, '/cfs/tasks')
}

export const updateDispatchTask = async (taskId: string, updates: { status?: string; notes?: string }) => {
  return xanoRequest(API_GROUPS.containers, `/cfs/tasks/${taskId}`, 'PATCH', updates)
}
