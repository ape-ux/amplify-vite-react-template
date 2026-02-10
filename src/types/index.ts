// FreightFlow Pro Type Definitions

export interface User {
  id: string
  email: string
  name?: string
  company?: string
  role: 'admin' | 'user' | 'viewer'
  tenant_id?: string
  created_at: string
}

export interface Quote {
  id: string
  status: 'pending' | 'quoted' | 'accepted' | 'expired' | 'declined'
  origin_zip: string
  origin_city?: string
  origin_state?: string
  destination_zip: string
  destination_city?: string
  destination_state?: string
  weight_lbs: number
  freight_class?: number
  pallets?: number
  accessorials?: string[]
  total_price?: number
  carrier_name?: string
  transit_days?: number
  created_at: string
  expires_at?: string
}

export interface Shipment {
  id: string
  quote_id?: string
  status: 'pending' | 'booked' | 'picked_up' | 'in_transit' | 'delivered' | 'exception'
  origin_address: Address
  destination_address: Address
  carrier_name: string
  carrier_pro_number?: string
  pickup_date: string
  delivery_date?: string
  weight_lbs: number
  pieces: number
  created_at: string
}

export interface Address {
  street: string
  city: string
  state: string
  zip: string
  country: string
}

export interface Booking {
  id: string
  quote_id: string
  shipment_id?: string
  status: 'pending' | 'confirmed' | 'cancelled'
  pickup_date: string
  carrier_name: string
  bol_number?: string
  created_at: string
}

export interface Container {
  id: string
  container_number: string
  status: 'en_route' | 'arrived_port' | 'at_pier' | 'at_cfs' | 'available' | 'dispatched' | 'delivered'
  risk_level: 'ok' | 'warning' | 'critical' | 'overdue'
  lfd_pier?: string
  lfd_warehouse?: string
  free_time_remaining?: number
  estimated_fees?: number
  vessel_name?: string
  port_of_entry?: string
  cfs_name?: string
  last_synced?: string
}

export interface Document {
  id: string
  shipment_id: string
  type: 'bol' | 'invoice' | 'packing_list' | 'pod' | 'customs' | 'other'
  filename: string
  url: string
  uploaded_at: string
}

export interface Agent {
  id: number
  name: string
  description: string
  llm: string
  status: 'active' | 'inactive' | 'error'
  task_count?: number
  last_run?: string
  uptime?: number
}

export interface RateQuote {
  carrier_name: string
  carrier_code: string
  service_type: string
  transit_days: number
  total_price: number
  base_price: number
  fuel_surcharge?: number
  accessorial_charges?: number
  expires_at: string
}

export interface DispatchTask {
  id: string
  container_id: string
  container_number: string
  type: 'lfd_alert' | 'pickup_schedule' | 'document_needed' | 'exception'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  due_date?: string
  notes?: string
  created_at: string
}

export interface Conversation {
  id: string
  title?: string
  agent_id?: number
  last_message?: string
  message_count: number
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  conversation_id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  created_at: string
}

// Chart/Analytics types
export interface ChartDataPoint {
  date: string
  value: number
  label?: string
}

export interface KPI {
  title: string
  value: number | string
  change?: number
  changeType?: 'increase' | 'decrease' | 'neutral'
  icon?: string
}
