// Xano API Client for FreightFlow Pro
// Instance: FreightFlowAi (xjlt-4ifj-k7qu)
// CORRECTED: Multiple API groups from Flow247 production code

const XANO_BASE = import.meta.env.VITE_XANO_BASE_URL || 'https://xjlt-4ifj-k7qu.n7e.xano.io'

// API Groups - VERIFIED from Xano Meta API (2026-02-11)
const API_GROUPS = {
  // Core Platform
  main: 'api:QC35j52Y',           // Auth, quotes, bookings, shipments
  agents: 'api:E1Skvg8o',         // Agents, customer profile, documents, TAI
  account: 'api:dqA59R7v',        // Account details, team members
  logs: 'api:Dg-LSQY9',           // Logs, user events
  chat: 'api:AKAonta6',           // Agent chat/conversation
  dashboard: 'api:I5SJFe7I',      // Dashboard KPIs
  rates: 'api:WXXqvI0z',          // Rate management
  documents: 'api:LFUW4MhX',      // Documents
  freight: 'api:RmiAEq2d',        // Core freight operations
  
  // STG Container Tracking
  stg: 'api:lt8FkLwE',            // STG Arrival Tracking (primary)
  stgOps: 'api:M6Xz5_I1',         // STG Operations
  stgFinancials: 'api:MDtcogTI',  // STG Financials
  
  // Carrier API Groups (Rate Shopping)
  tai: 'api:E1Skvg8o',            // TAI is in main Shipping group
  echo: 'api:XBMF85vX',           // Echo Global Logistics
  chr: 'api:amLqxuBm',            // CH Robinson
  tql: 'api:5QFqgmDM',            // TQL
  estes: 'api:Z-Cm8uxf',          // Estes Express
  exfreight: 'api:WxLFCQzN',      // ExFreight Complete
  amass: 'api:t1nPOzUD',          // Amass LCL Rates
  maersk: 'api:IFuQjYHg',         // Maersk
  one: 'api:djoDpxJL',            // ONE (lcl group)
  xenon: 'api:8GqJxdlq',          // Xenon Drayage
  // shipprimus: 'api:TBD',       // ShipPrimus (being created)
  
  // Integrations
  stripe: 'api:UQuTJ3vx',         // Stripe Payments
  sendgrid: 'api:5e9BgwVw',       // SendGrid Email
  googleMaps: 'api:oCaVtmi7',     // Google Maps/Geocoding
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
  apiGroup: string = API_GROUPS.main
): Promise<T> => {
  const token = getXanoAuthToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  // Handle full URLs vs relative endpoints
  const url = endpoint.startsWith('http') 
    ? endpoint 
    : `${XANO_BASE}/${apiGroup}${endpoint}`
  
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
// AUTH ENDPOINTS (api:QC35j52Y)
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
  return xanoRequest<any>('/auth/me')
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
// CUSTOMER PROFILE (api:E1Skvg8o)
// =====================

export const getCustomerProfile = async () => {
  return xanoRequest<any>('/customer/profile', 'GET', undefined, API_GROUPS.agents)
}

export const updateCustomerProfile = async (data: any) => {
  return xanoRequest<any>('/customer/profile', 'PATCH', data, API_GROUPS.agents)
}

// =====================
// QUOTES ENDPOINTS (api:QC35j52Y)
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

export const createQuote = async (quoteData: any) => {
  return xanoRequest('/v1/quotes', 'POST', quoteData)
}

export const createLclImportQuote = async (data: any) => {
  return xanoRequest('/v1/quotes/lcl/import', 'POST', data)
}

export const createLclExportQuote = async (data: any) => {
  return xanoRequest('/v1/quotes/lcl/export', 'POST', data)
}

export const createFclQuote = async (data: any) => {
  return xanoRequest('/v1/quotes/fcl', 'POST', data)
}

// =====================
// SHIPMENTS ENDPOINTS (api:QC35j52Y)
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
// BOOKINGS ENDPOINTS (api:QC35j52Y)
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
// CARRIERS & RATES (api:QC35j52Y)
// =====================

export const getCarriers = async () => {
  return xanoRequest<any[]>('/searates/carriers')
}

export const getSpotRates = async (params: any) => {
  return xanoRequest('/offers/spot-rates', 'POST', params)
}

export const getSailingSchedules = async (params?: any) => {
  const query = params ? `?${new URLSearchParams(params)}` : ''
  return xanoRequest<any[]>(`/sailing-schedules${query}`)
}

export const getLocations = async (search?: string) => {
  const query = search ? `?search=${encodeURIComponent(search)}` : ''
  return xanoRequest<any[]>(`/locations${query}`)
}

// =====================
// RATE SHOPPING (Multi-Carrier)
// =====================

export interface RateShopRequest {
  origin: {
    city: string
    state: string
    zipcode: string
    country?: string
  }
  destination: {
    city: string
    state: string
    zipcode: string
    country?: string
  }
  freight_items: Array<{
    qty: number
    weight: number
    weight_type?: 'each' | 'total'
    length?: number
    width?: number
    height?: number
    dim_type?: 'PLT' | 'BOX' | 'CRATE'
    class?: number
    commodity?: string
  }>
  pickup_date?: string
  accessorials?: string[]
  carriers?: ('tai' | 'echo' | 'chr' | 'tql' | 'estes' | 'exfreight' | 'amass' | 'maersk' | 'one' | 'xenon')[]
}

// Get rates from TAI
export const getTaiRates = async (request: RateShopRequest) => {
  return xanoRequest('/rates/shop', 'POST', request, API_GROUPS.tai)
}

// Get rates from Echo Global
export const getEchoRates = async (request: RateShopRequest) => {
  return xanoRequest('/get-rates', 'POST', request, API_GROUPS.echo)
}

// Get rates from CH Robinson
export const getChrRates = async (request: RateShopRequest) => {
  return xanoRequest('/rate-quote', 'POST', request, API_GROUPS.chr)
}

// Get rates from TQL
export const getTqlRates = async (request: RateShopRequest) => {
  return xanoRequest('/rate', 'POST', request, API_GROUPS.tql)
}

// Get rates from Estes
export const getEstesRates = async (request: RateShopRequest) => {
  return xanoRequest('/rate-quote', 'POST', request, API_GROUPS.estes)
}

// Get rates from ExFreight (Ocean)
export const getExfreightRates = async (request: RateShopRequest) => {
  return xanoRequest('/rates', 'POST', request, API_GROUPS.exfreight)
}

// Get rates from Amass LCL
export const getAmassRates = async (request: RateShopRequest) => {
  return xanoRequest('/quote', 'POST', request, API_GROUPS.amass)
}

// Get rates from Maersk
export const getMaerskRates = async (request: RateShopRequest) => {
  return xanoRequest('/rates', 'POST', request, API_GROUPS.maersk)
}

// Get rates from ONE
export const getOneRates = async (request: RateShopRequest) => {
  return xanoRequest('/rates', 'POST', request, API_GROUPS.one)
}

// Get rates from Xenon (Drayage)
export const getXenonRates = async (request: RateShopRequest) => {
  return xanoRequest('/rate', 'POST', request, API_GROUPS.xenon)
}

// Unified rate shopping - calls all enabled carriers in parallel
export const shopRates = async (request: RateShopRequest) => {
  const enabledCarriers = request.carriers || ['tai', 'echo', 'chr', 'estes']
  
  const carrierFunctions: Record<string, (req: RateShopRequest) => Promise<any>> = {
    tai: getTaiRates,
    echo: getEchoRates,
    chr: getChrRates,
    tql: getTqlRates,
    estes: getEstesRates,
    exfreight: getExfreightRates,
    amass: getAmassRates,
    maersk: getMaerskRates,
    one: getOneRates,
    xenon: getXenonRates,
  }
  
  const promises = enabledCarriers.map(async (carrier) => {
    try {
      const fn = carrierFunctions[carrier]
      if (!fn) return { carrier, success: false, error: 'Unknown carrier' }
      const rates = await fn(request)
      return { carrier, success: true, rates }
    } catch (error: any) {
      return { carrier, success: false, error: error.message }
    }
  })
  
  const results = await Promise.allSettled(promises)
  
  return results.map((r, i) => 
    r.status === 'fulfilled' ? r.value : { carrier: enabledCarriers[i], success: false, error: 'Request failed' }
  )
}

// =====================
// DASHBOARD (api:I5SJFe7I)
// =====================

export const getDashboardStats = async () => {
  return xanoRequest<any>('/stats', 'GET', undefined, API_GROUPS.dashboard)
}

export const getDashboardKPIs = async () => {
  return xanoRequest<any>('/kpis', 'GET', undefined, API_GROUPS.dashboard)
}

// =====================
// AI AGENTS (api:E1Skvg8o)
// =====================

export const getAgents = async () => {
  return xanoRequest<{ success: boolean; agents: any[]; total: number }>('/agents', 'GET', undefined, API_GROUPS.agents)
}

export const getAgent = async (id: number) => {
  return xanoRequest<any>(`/agent/${id}`, 'GET', undefined, API_GROUPS.agents)
}

export const runAgent = async (agentId: number, input: string, context?: object) => {
  const url = `${XANO_BASE}/${API_GROUPS.agents}/agent/${agentId}/run`
  const token = getXanoAuthToken()
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      messages: [{ role: 'user', content: input }],
      user_context: context,
    }),
  })
  
  if (!response.ok) {
    throw new Error(`Agent run failed: ${response.status}`)
  }
  
  return response.json()
}

export const streamAgent = async (
  agentId: number,
  input: string,
  onChunk: (chunk: string) => void,
  context?: object
) => {
  const url = `${XANO_BASE}/${API_GROUPS.agents}/agent/${agentId}/stream`
  const token = getXanoAuthToken()
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      messages: [{ role: 'user', content: input }],
      user_context: context,
    }),
  })
  
  const reader = response.body?.getReader()
  const decoder = new TextDecoder()
  
  while (reader) {
    const { done, value } = await reader.read()
    if (done) break
    const chunk = decoder.decode(value)
    onChunk(chunk)
  }
}

// =====================
// CHAT / CONVERSATIONS (api:AKAonta6)
// =====================

export const sendAgentMessage = async (message: string) => {
  return xanoRequest('/agent/message', 'POST', { message }, API_GROUPS.chat)
}

export const getConversation = async (conversationId: string) => {
  return xanoRequest<any>(`/agent/conversation/${conversationId}`, 'GET', undefined, API_GROUPS.chat)
}

export const getConversations = async () => {
  return xanoRequest<any[]>('/agent/conversations', 'GET', undefined, API_GROUPS.chat)
}

export const getMessages = async (conversationId: string) => {
  return xanoRequest<any[]>(`/agent/conversation/${conversationId}/messages`, 'GET', undefined, API_GROUPS.chat)
}

export const sendMessage = async (conversationId: string, message: string) => {
  return xanoRequest(`/agent/conversation/${conversationId}/message`, 'POST', { content: message }, API_GROUPS.chat)
}

// =====================
// STG CONTAINER TRACKING (api:M6Xz5_I1)
// =====================

export const getContainers = async () => {
  return xanoRequest<any[]>('/stg/warehouse_receipts', 'GET', undefined, API_GROUPS.stg)
}

export const getContainer = async (containerNumber: string) => {
  return xanoRequest<any>(`/stg/container/${containerNumber}/status`, 'GET', undefined, API_GROUPS.stg)
}

export const refreshContainer = async (containerNumber: string) => {
  return xanoRequest<any>(`/stg/container/${containerNumber}/refresh`, 'POST', undefined, API_GROUPS.stg)
}

export const getDispatchTasks = async () => {
  return xanoRequest<any[]>('/stg/tasks', 'GET', undefined, API_GROUPS.stg)
}

// =====================
// DOCUMENTS (api:E1Skvg8o)
// =====================

export const getDocuments = async (filters?: { shipment_id?: string }) => {
  const query = filters?.shipment_id ? `?shipment_id=${filters.shipment_id}` : ''
  return xanoRequest<any[]>(`/documents${query}`, 'GET', undefined, API_GROUPS.agents)
}

export const uploadDocument = async (file: File, metadata: { shipment_id?: string; document_type?: string }) => {
  const url = `${XANO_BASE}/${API_GROUPS.agents}/documents/upload`
  const token = getXanoAuthToken()
  
  const formData = new FormData()
  formData.append('file', file)
  if (metadata.shipment_id) formData.append('shipment_id', metadata.shipment_id)
  if (metadata.document_type) formData.append('document_type', metadata.document_type)
  
  const response = await fetch(url, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  })
  
  if (!response.ok) throw new Error('Upload failed')
  return response.json()
}

// =====================
// ACCOUNT (api:dqA59R7v)
// =====================

export const getAccountDetails = async () => {
  return xanoRequest<any>('/account/details', 'GET', undefined, API_GROUPS.account)
}

export const getTeamMembers = async () => {
  return xanoRequest<any[]>('/account/my_team_members', 'GET', undefined, API_GROUPS.account)
}

// =====================
// LOGS (api:Dg-LSQY9)
// =====================

export const getUserEvents = async () => {
  return xanoRequest<any[]>('/logs/user/my_events', 'GET', undefined, API_GROUPS.logs)
}
