import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowRight, Truck, Clock, DollarSign, Filter, RefreshCw, Check, AlertCircle, Package } from 'lucide-react'
import { shopRates, bookRate } from '../lib/api'
import type { RateQuote } from '../types'

// Based on: Quote & Rate Shopping Dashboard (Stitch Project 11108259562432774954)
// Theme: DARK, Primary: #137fec, Accent: #19cc61, Font: Inter

interface RateResult extends RateQuote {
  id: string
  carrier: string
  recommended?: boolean
}

const ACCESSORIALS = [
  { id: 'liftgate_pickup', label: 'Liftgate Pickup' },
  { id: 'liftgate_delivery', label: 'Liftgate Delivery' },
  { id: 'appointment_pickup', label: 'Appointment Pickup' },
  { id: 'appointment_delivery', label: 'Appointment Delivery' },
  { id: 'inside_pickup', label: 'Inside Pickup' },
  { id: 'inside_delivery', label: 'Inside Delivery' },
  { id: 'residential_pickup', label: 'Residential Pickup' },
  { id: 'residential_delivery', label: 'Residential Delivery' },
]

const FREIGHT_CLASSES = [
  { value: '', label: 'Auto-detect' },
  { value: '50', label: 'Class 50 - Clean Freight' },
  { value: '55', label: 'Class 55' },
  { value: '60', label: 'Class 60' },
  { value: '65', label: 'Class 65' },
  { value: '70', label: 'Class 70' },
  { value: '77.5', label: 'Class 77.5' },
  { value: '85', label: 'Class 85' },
  { value: '92.5', label: 'Class 92.5' },
  { value: '100', label: 'Class 100' },
  { value: '110', label: 'Class 110' },
  { value: '125', label: 'Class 125' },
  { value: '150', label: 'Class 150' },
  { value: '175', label: 'Class 175' },
  { value: '200', label: 'Class 200' },
  { value: '250', label: 'Class 250' },
  { value: '300', label: 'Class 300' },
  { value: '400', label: 'Class 400' },
  { value: '500', label: 'Class 500 - Low Density' },
]

export default function RateShop() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    originZip: '',
    destZip: '',
    weight: '',
    pieces: '1',
    freightClass: '',
    length: '',
    width: '',
    height: '',
    accessorials: [] as string[],
  })
  const [isSearching, setIsSearching] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const [rates, setRates] = useState<RateResult[]>([])
  const [selectedRate, setSelectedRate] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'price' | 'transit' | 'rating'>('price')
  const [error, setError] = useState('')
  const [quoteId, setQuoteId] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleAccessorialToggle = (accessorialId: string) => {
    setFormData(prev => ({
      ...prev,
      accessorials: prev.accessorials.includes(accessorialId)
        ? prev.accessorials.filter(a => a !== accessorialId)
        : [...prev.accessorials, accessorialId],
    }))
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)
    setRates([])
    setSelectedRate(null)
    setError('')
    
    try {
      const response = await shopRates({
        origin_zip: formData.originZip,
        destination_zip: formData.destZip,
        weight_lbs: parseInt(formData.weight),
        pieces: parseInt(formData.pieces) || 1,
        freight_class: formData.freightClass ? parseFloat(formData.freightClass) : undefined,
        dimensions: formData.length && formData.width && formData.height ? {
          length: parseInt(formData.length),
          width: parseInt(formData.width),
          height: parseInt(formData.height),
        } : undefined,
        accessorials: formData.accessorials.length > 0 ? formData.accessorials : undefined,
      })

      if (response?.rates && Array.isArray(response.rates)) {
        // Transform and add recommended flag to best value
        const transformedRates: RateResult[] = response.rates.map((rate: RateQuote, index: number) => ({
          ...rate,
          id: `rate_${index}`,
          carrier: rate.carrier_name,
          recommended: false,
        }))

        // Mark best value (lowest price with transit ≤ 4 days) as recommended
        const eligible = transformedRates.filter(r => r.transit_days <= 4)
        if (eligible.length > 0) {
          const bestValue = eligible.reduce((best, r) => r.total_price < best.total_price ? r : best)
          bestValue.recommended = true
        }

        setRates(transformedRates)
        setQuoteId(response.quote_id || null)
      } else {
        setError('No rates found for this lane. Try adjusting your criteria.')
      }
    } catch (err: any) {
      console.error('Rate shop error:', err)
      setError(err.message || 'Failed to fetch rates. Please try again.')
    } finally {
      setIsSearching(false)
    }
  }

  const sortedRates = [...rates].sort((a, b) => {
    if (sortBy === 'price') return a.total_price - b.total_price
    if (sortBy === 'transit') return a.transit_days - b.transit_days
    return 0 // Would need rating data
  })

  const handleSelectRate = (id: string) => {
    setSelectedRate(id)
  }

  const handleBook = async () => {
    if (!selectedRate || !quoteId) return
    
    setIsBooking(true)
    try {
      const selectedRateData = rates.find(r => r.id === selectedRate)
      if (!selectedRateData) return

      // Get pickup date (default to tomorrow)
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const pickupDate = tomorrow.toISOString().split('T')[0]

      const booking = await bookRate(quoteId, pickupDate)
      
      if (booking?.booking?.id) {
        // Navigate to booking confirmation
        navigate(`/ape-ux/bookings/${booking.booking.id}`)
      }
    } catch (err: any) {
      console.error('Booking error:', err)
      setError(err.message || 'Failed to create booking. Please try again.')
    } finally {
      setIsBooking(false)
    }
  }

  const selectedRateData = rates.find(r => r.id === selectedRate)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Rate Shopping</h1>
        <p className="text-slate-400">Compare LTL freight rates from 15+ carriers instantly</p>
      </div>

      {/* Quote Form */}
      <div className="bg-surface-secondary/50 border border-slate-700/50 rounded-2xl p-6">
        <form onSubmit={handleSearch} className="space-y-6">
          {/* Origin & Destination */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Origin ZIP</label>
              <input
                type="text"
                name="originZip"
                value={formData.originZip}
                onChange={handleChange}
                className="w-full bg-surface-primary/50 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                placeholder="e.g., 90210"
                required
                maxLength={5}
                pattern="[0-9]{5}"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Destination ZIP</label>
              <input
                type="text"
                name="destZip"
                value={formData.destZip}
                onChange={handleChange}
                className="w-full bg-surface-primary/50 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                placeholder="e.g., 10001"
                required
                maxLength={5}
                pattern="[0-9]{5}"
              />
            </div>
          </div>

          {/* Weight, Pieces & Class */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Weight (lbs)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full bg-surface-primary/50 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                placeholder="e.g., 500"
                required
                min="1"
                max="45000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Pieces/Pallets</label>
              <input
                type="number"
                name="pieces"
                value={formData.pieces}
                onChange={handleChange}
                className="w-full bg-surface-primary/50 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                placeholder="1"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Freight Class</label>
              <select
                name="freightClass"
                value={formData.freightClass}
                onChange={handleChange}
                className="w-full bg-surface-primary/50 border border-slate-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              >
                {FREIGHT_CLASSES.map(fc => (
                  <option key={fc.value} value={fc.value}>{fc.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Dimensions */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Dimensions (optional)</label>
            <div className="grid grid-cols-3 gap-4">
              <input
                type="number"
                name="length"
                value={formData.length}
                onChange={handleChange}
                className="w-full bg-surface-primary/50 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                placeholder="Length (in)"
                min="1"
              />
              <input
                type="number"
                name="width"
                value={formData.width}
                onChange={handleChange}
                className="w-full bg-surface-primary/50 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                placeholder="Width (in)"
                min="1"
              />
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full bg-surface-primary/50 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                placeholder="Height (in)"
                min="1"
              />
            </div>
          </div>

          {/* Accessorials */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Accessorials</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {ACCESSORIALS.map(acc => (
                <label
                  key={acc.id}
                  className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition ${
                    formData.accessorials.includes(acc.id)
                      ? 'bg-primary/20 border-primary text-white'
                      : 'bg-surface-tertiary/30 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.accessorials.includes(acc.id)}
                    onChange={() => handleAccessorialToggle(acc.id)}
                    className="sr-only"
                  />
                  <Check className={`w-4 h-4 ${formData.accessorials.includes(acc.id) ? 'opacity-100' : 'opacity-0'}`} />
                  <span className="text-sm">{acc.label}</span>
                </label>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-4 bg-accent-red/10 border border-accent-red/20 rounded-xl text-accent-red text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSearching}
            className="w-full bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-white font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50 shadow-glow-primary"
          >
            {isSearching ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Searching carriers...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Get Rates
              </>
            )}
          </button>
        </form>
      </div>

      {/* Results */}
      {rates.length > 0 && (
        <div className="space-y-4">
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">{rates.length} rates found</h2>
              <p className="text-sm text-slate-400">
                {formData.originZip} <ArrowRight className="w-4 h-4 inline" /> {formData.destZip} • {formData.weight} lbs
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as typeof sortBy)}
                className="bg-surface-secondary border border-slate-700 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="price">Lowest Price</option>
                <option value="transit">Fastest Transit</option>
              </select>
            </div>
          </div>

          {/* Rate Cards */}
          <div className="space-y-3">
            {sortedRates.map(rate => (
              <div
                key={rate.id}
                onClick={() => handleSelectRate(rate.id)}
                className={`relative bg-surface-secondary/50 border rounded-2xl p-6 cursor-pointer transition hover:border-primary/50 ${
                  selectedRate === rate.id ? 'border-primary ring-2 ring-primary/20' : 'border-slate-700/50'
                } ${rate.recommended ? 'ring-1 ring-accent-green/30' : ''}`}
              >
                {rate.recommended && (
                  <div className="absolute -top-3 left-4 bg-accent-green text-white text-xs font-medium px-3 py-1 rounded-full">
                    ⭐ Best Value
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-surface-tertiary rounded-xl flex items-center justify-center">
                      <Truck className="w-6 h-6 text-slate-300" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white">{rate.carrier}</h3>
                        <span className="text-xs bg-surface-tertiary text-slate-300 px-2 py-0.5 rounded">{rate.carrier_code}</span>
                      </div>
                      <p className="text-sm text-slate-400">{rate.service_type}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">Transit</span>
                      </div>
                      <p className="font-semibold text-white">{rate.transit_days} days</p>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1 text-slate-400 justify-end">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-sm">Total</span>
                      </div>
                      <p className="text-2xl font-bold text-accent-green">${rate.total_price.toFixed(2)}</p>
                      <p className="text-xs text-slate-500">
                        Base ${rate.base_price?.toFixed(2) || '—'} + Fuel ${rate.fuel_surcharge?.toFixed(2) || '—'}
                      </p>
                    </div>

                    {selectedRate === rate.id && (
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Book Button */}
          {selectedRate && selectedRateData && (
            <div className="flex items-center justify-between p-4 bg-surface-secondary/50 border border-slate-700/50 rounded-2xl">
              <div>
                <p className="text-slate-400 text-sm">Selected Rate</p>
                <p className="text-white font-semibold">
                  {selectedRateData.carrier} - ${selectedRateData.total_price.toFixed(2)}
                </p>
              </div>
              <button
                onClick={handleBook}
                disabled={isBooking}
                className="bg-accent-green hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-xl transition flex items-center gap-2 disabled:opacity-50 shadow-glow-green"
              >
                {isBooking ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Package className="w-5 h-5" />
                    Book Now
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!isSearching && rates.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Enter shipment details above to get instant rates</p>
          <p className="text-sm mt-1">Compare 15+ carriers in seconds</p>
        </div>
      )}
    </div>
  )
}
