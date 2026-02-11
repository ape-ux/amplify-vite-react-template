// Xano API Client for FreightFlow Pro
// Instance: FreightFlowAi (xjlt-4ifj-k7qu)
// Correct API Base: api:QC35j52Y (from Flow247)

const XANO_BASE = import.meta.env.VITE_XANO_BASE_URL || 'https://xjlt-4ifj-k7qu.n7e.xano.io'

// API Groups - CORRECTED from Flow247
const API_GROUPS = {
  main: 'api:QC35j52Y',           // Main API (auth, quotes, shipments, bookings)
  agents: 'api:E1Skvg8o',         // AI Agents
  chat: 'api:AKAonta6',           // Chat/conversation (if exists)
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
const xanoRequest = async <T = any>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  body?: object,
  customBase?: string
): Promise<T> => {
  const token = getXanoAuthToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const base = customBase || `${XANO_BASE}/${API_GROUPS.main}`
  const url = `${base}${endpoint}`
  
  console.log(`[Xano] ${method} ${url}`)
  
  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }))
    console.error(`[Xano] Error:`, error)
    throw new Error(error.message || `HTTP ${response.status}`)
  }

  return response.json()
}

// =====================
// AUTH ENDPOINTS
// =====================

export const login = async (email: string, password: string) => {
  const data = await xanoRequest<{ authToken: string; user: any }>('/auth/login', 'POST', { email, password })
  if (data.authToken) {
    setXanoAuthToken(data.authToken)
  }
  return data
}

export const signup = async (email: string, password: string, name?: string) => {
  const data = await xanoRequest<{ authToken: string; user: any }>('/auth/signup', 'POST', { email, password, name })
  if (data.authToken) {
    setXanoAuthToken(data.authToken)
  }
  return data
}

export const getMe = async () => {
  return xanoRequest<{ user: any }>('/auth/me')
}

// Sync Supabase user to Xano
export const syncUser = async (supabaseUserId: string, email: string, metadata?: { name?: string }) => {
  const data = await xanoRequest<{ status: string; user: any; authToken: string }>('/user/sync', 'POST', {
    supabase_user_id: supabaseUserId,
    email,
    name: metadata?.name,
  })
  if (data.authToken) {
    setXanoAuthToken(data.authToken)
  }
  return data
}

// =====================
// QUOTES ENDPOINTS
// =====================

export const getQuotes = async (filters?: { status?: string; limit?: number }) => {
  const params = new URLSearchParams()
  if (filters?.status) params.append('status', filters.status)
  if (filters?.limit) params.append('limit', String(filters.limit))
  const query = params.toString() ? `?${params}` : ''
  return xanoRequest<any[]>(`/v1/quotes${query}`)
}

export const getQuote = async (id: string) => {
  return xanoRequest<any>(`/v1/quotes/${id}`)
}

export const getQuoteResults = async (quoteId: string) => {
  return xanoRequest<any>(`/v1/quotes/${quoteId}/results`)
}

export const createQuote = async (quoteData: {
  origin_zip: string
  destination_zip: string
  weight_lbs: number
  freight_class?: number
  pallets?: number
  accessorials?: string[]
}) => {
  return xanoRequest('/v1/quotes', 'POST', quoteData)
}

// LCL Import Quote
export const createLclImportQuote = async (data: any) => {
  return xanoRequest('/v1/quotes/lcl/import', 'POST', data)
}

// LCL Export Quote
export const createLclExportQuote = async (data: any) => {
  return xanoRequest('/v1/quotes/lcl/export', 'POST', data)
}

// FCL Quote
export const createFclQuote = async (data: any) => {
  return xanoRequest('/v1/quotes/fcl', 'POST', data)
}

// =====================
// SHIPMENTS ENDPOINTS
// =====================

export const getShipments = async (filters?: { status?: string; limit?: number }) => {
  const params = new URLSearchParams()
  if (filters?.status) params.append('status', filters.status)
  if (filters?.limit) params.append('limit', String(filters.limit))
  const query = params.toString() ? `?${params}` : ''
  return xanoRequest<any[]>(`/v1/shipments${query}`)
}

export const getShipment = async (id: string) => {
  return xanoRequest<any>(`/v1/shipments/${id}`)
}

export const bookShipment = async (bookingData: any) => {
  return xanoRequest('/v1/shipments/book', 'POST', bookingData)
}

export const dispatchShipment = async (shipmentId: string, dispatchData: any) => {
  return xanoRequest(`/v1/shipments/${shipmentId}/dispatch`, 'POST', dispatchData)
}

// =====================
// BOOKINGS ENDPOINTS
// =====================

export const getBookings = async () => {
  return xanoRequest<any[]>('/v1/bookings')
}

export const getBooking = async (id: string) => {
  return xanoRequest<any>(`/v1/bookings/${id}`)
}

export const createBooking = async (quoteId: string, pickupDate: string) => {
  return xanoRequest('/v1/bookings', 'POST', {
    quote_id: quoteId,
    pickup_date: pickupDate,
  })
}

export const updateBooking = async (id: string, data: any) => {
  return xanoRequest(`/v1/bookings/${id}`, 'PATCH', data)
}

// =====================
// CARRIERS & RATES
// =====================

export const getCarriers = async () => {
  return xanoRequest<any[]>('/searates/carriers')
}

export const getSpotRates = async (params: any) => {
  return xanoRequest('/offers/spot-rates', 'POST', params)
}

// =====================
// OCEAN / SCHEDULES
// =====================

export const fetchSchedules = async (params: any) => {
  return xanoRequest('/fetch_and_save_schedules', 'POST', params)
}

export const getOceanProducts = async () => {
  return xanoRequest<any[]>('/ocean-nap-products')
}

// =====================
// AI AGENTS (Different API Group)
// =====================

const agentsBase = `${XANO_BASE}/${API_GROUPS.agents}`

export const getAgents = async () => {
  return xanoRequest<any[]>('/agents', 'GET', undefined, agentsBase)
}

export const getAgent = async (id: number) => {
  return xanoRequest<any>(`/agent/${id}`, 'GET', undefined, agentsBase)
}

export const runAgent = async (agentId: number, input: string, context?: object) => {
  return xanoRequest(`/agent/${agentId}/run`, 'POST', {
    messages: [{ role: 'user', content: input }],
    user_context: context,
  }, agentsBase)
}

// =====================
// CONTAINERS / STG (if exists)
// =====================

export const getContainers = async () => {
  // TODO: Verify this endpoint exists
  return xanoRequest<any[]>('/cfs/containers')
}

export const getContainer = async (id: string) => {
  return xanoRequest<any>(`/cfs/containers/${id}`)
}

export const refreshContainer = async (id: string) => {
  return xanoRequest(`/cfs/containers/${id}/refresh`, 'POST')
}

export const getDispatchTasks = async () => {
  return xanoRequest<any[]>('/cfs/tasks')
}

// =====================
// DOCUMENTS
// =====================

export const getDocuments = async (shipmentId: string) => {
  return xanoRequest<any[]>(`/shipments/${shipmentId}/documents`)
}

export const uploadDocument = async (shipmentId: string, file: File, docType: string) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('document_type', docType)
  
  const token = getXanoAuthToken()
  const response = await fetch(
    `${XANO_BASE}/${API_GROUPS.main}/shipments/${shipmentId}/documents`,
    {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    }
  )
  
  if (!response.ok) throw new Error('Upload failed')
  return response.json()
}

// =====================
// CHAT / CONVERSATIONS (if exists)
// =====================

export const getConversations = async () => {
  const chatBase = `${XANO_BASE}/${API_GROUPS.chat}`
  return xanoRequest<any[]>('/conversations', 'GET', undefined, chatBase)
}

export const getMessages = async (conversationId: string) => {
  const chatBase = `${XANO_BASE}/${API_GROUPS.chat}`
  return xanoRequest<any[]>(`/conversations/${conversationId}/messages`, 'GET', undefined, chatBase)
}

export const sendMessage = async (conversationId: string, message: string) => {
  const chatBase = `${XANO_BASE}/${API_GROUPS.chat}`
  return xanoRequest(`/conversations/${conversationId}/messages`, 'POST', { content: message }, chatBase)
}
