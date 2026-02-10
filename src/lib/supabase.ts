import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://chpeeawrdhjfqgdhqhsr.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export const signUp = async (email: string, password: string, metadata?: object) => {
  const { data, error } = await supabase.auth.signUp({ 
    email, 
    password,
    options: { data: metadata }
  })
  if (error) throw error
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) throw error
  return session
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

// Database helpers
export const fetchShipments = async (tenantId?: string) => {
  let query = supabase.from('shipments').select('*')
  if (tenantId) query = query.eq('tenant_id', tenantId)
  const { data, error } = await query.order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export const fetchQuotes = async (tenantId?: string) => {
  let query = supabase.from('quotes').select('*')
  if (tenantId) query = query.eq('tenant_id', tenantId)
  const { data, error } = await query.order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export const fetchDocuments = async (shipmentId: string) => {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('shipment_id', shipmentId)
  if (error) throw error
  return data
}

// Realtime subscriptions
export const subscribeToShipments = (callback: (payload: any) => void) => {
  return supabase
    .channel('shipments')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'shipments' }, callback)
    .subscribe()
}

export const subscribeToContainers = (callback: (payload: any) => void) => {
  return supabase
    .channel('containers')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'stg_container_arrival' }, callback)
    .subscribe()
}
