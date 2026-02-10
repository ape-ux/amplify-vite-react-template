import { useState } from 'react'
import { Search, ArrowRight, Truck, Clock, DollarSign, Star, Filter, RefreshCw, Check } from 'lucide-react'

// Based on: Quote & Rate Shopping Dashboard (Stitch Project 11108259562432774954)
// Theme: DARK, Font: INTER, Accent: #19cc61

interface RateResult {
  id: string
  carrier: string
  carrierCode: string
  service: string
  transitDays: number
  price: number
  basePrice: number
  fuelSurcharge: number
  rating: number
  recommended?: boolean
}

const mockRates: RateResult[] = [
  { id: '1', carrier: 'TAI Freight', carrierCode: 'TAI', service: 'Standard LTL', transitDays: 3, price: 485.50, basePrice: 420, fuelSurcharge: 65.50, rating: 4.8, recommended: true },
  { id: '2', carrier: 'Estes Express', carrierCode: 'EXLA', service: 'Ground', transitDays: 4, price: 512.00, basePrice: 450, fuelSurcharge: 62.00, rating: 4.6 },
  { id: '3', carrier: 'Echo Global', carrierCode: 'ECHO', service: 'Economy', transitDays: 5, price: 445.75, basePrice: 395, fuelSurcharge: 50.75, rating: 4.4 },
  { id: '4', carrier: 'CH Robinson', carrierCode: 'CHR', service: 'Standard', transitDays: 4, price: 498.00, basePrice: 435, fuelSurcharge: 63.00, rating: 4.7 },
  { id: '5', carrier: 'TQL', carrierCode: 'TQL', service: 'LTL Ground', transitDays: 3, price: 525.00, basePrice: 460, fuelSurcharge: 65.00, rating: 4.5 },
]

export default function RateShop() {
  const [formData, setFormData] = useState({
    originZip: '',
    destZip: '',
    weight: '',
    pieces: '1',
    freightClass: '',
    length: '',
    width: '',
    height: '',
  })
  const [isSearching, setIsSearching] = useState(false)
  const [rates, setRates] = useState<RateResult[]>([])
  const [selectedRate, setSelectedRate] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'price' | 'transit' | 'rating'>('price')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)
    setRates([])
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setRates(mockRates)
    setIsSearching(false)
  }

  const sortedRates = [...rates].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price
    if (sortBy === 'transit') return a.transitDays - b.transitDays
    return b.rating - a.rating
  })

  const handleSelectRate = (id: string) => {
    setSelectedRate(id)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Rate Shopping</h1>
        <p className="text-slate-400">Compare LTL freight rates from 15+ carriers instantly</p>
      </div>

      {/* Quote Form */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
        <form onSubmit={handleSearch} className="space-y-6">
          {/* Origin & Destination */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-slate-300 mb-2">Origin ZIP</label>
              <input
                type="text"
                name="originZip"
                value={formData.originZip}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., 90210"
                required
                maxLength={5}
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-slate-300 mb-2">Destination ZIP</label>
              <input
                type="text"
                name="destZip"
                value={formData.destZip}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., 10001"
                required
                maxLength={5}
              />
            </div>
          </div>

          {/* Weight & Pieces */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Weight (lbs)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., 500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Pieces</label>
              <input
                type="number"
                name="pieces"
                value={formData.pieces}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Auto-detect</option>
                <option value="50">Class 50</option>
                <option value="55">Class 55</option>
                <option value="60">Class 60</option>
                <option value="65">Class 65</option>
                <option value="70">Class 70</option>
                <option value="77.5">Class 77.5</option>
                <option value="85">Class 85</option>
                <option value="92.5">Class 92.5</option>
                <option value="100">Class 100</option>
                <option value="110">Class 110</option>
                <option value="125">Class 125</option>
                <option value="150">Class 150</option>
                <option value="175">Class 175</option>
                <option value="200">Class 200</option>
                <option value="250">Class 250</option>
                <option value="300">Class 300</option>
                <option value="400">Class 400</option>
                <option value="500">Class 500</option>
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
                className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Length (in)"
              />
              <input
                type="number"
                name="width"
                value={formData.width}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Width (in)"
              />
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Height (in)"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSearching}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
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
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="price">Lowest Price</option>
                <option value="transit">Fastest Transit</option>
                <option value="rating">Best Rating</option>
              </select>
            </div>
          </div>

          {/* Rate Cards */}
          <div className="space-y-3">
            {sortedRates.map(rate => (
              <div
                key={rate.id}
                onClick={() => handleSelectRate(rate.id)}
                className={`relative bg-slate-800/50 border rounded-2xl p-6 cursor-pointer transition hover:border-green-500/50 ${
                  selectedRate === rate.id ? 'border-green-500 ring-2 ring-green-500/20' : 'border-slate-700/50'
                } ${rate.recommended ? 'ring-1 ring-green-500/30' : ''}`}
              >
                {rate.recommended && (
                  <div className="absolute -top-3 left-4 bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Recommended
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center">
                      <Truck className="w-6 h-6 text-slate-300" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white">{rate.carrier}</h3>
                        <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded">{rate.carrierCode}</span>
                      </div>
                      <p className="text-sm text-slate-400">{rate.service}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">Transit</span>
                      </div>
                      <p className="font-semibold text-white">{rate.transitDays} days</p>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center gap-1 text-slate-400">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm">Rating</span>
                      </div>
                      <p className="font-semibold text-white">{rate.rating}</p>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1 text-slate-400 justify-end">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-sm">Total</span>
                      </div>
                      <p className="text-2xl font-bold text-green-400">${rate.price.toFixed(2)}</p>
                      <p className="text-xs text-slate-500">
                        Base ${rate.basePrice} + Fuel ${rate.fuelSurcharge}
                      </p>
                    </div>

                    {selectedRate === rate.id && (
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Book Button */}
          {selectedRate && (
            <div className="flex justify-end">
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl transition flex items-center gap-2">
                Book Selected Rate
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
