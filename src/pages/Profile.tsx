import { useState } from 'react'
import { User, Mail, Building2, Phone, MapPin, Camera, Save, Bell, Shield, Key, CreditCard, Loader2 } from 'lucide-react'

// Based on: Customer Profile (Stitch Project 17885049663058258855)
// Theme: LIGHT, Font: MANROPE, Accent: #0d7ff2

export default function Profile() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isSaving, setIsSaving] = useState(false)
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Logistics Inc.',
    role: 'Logistics Manager',
    address: '123 Shipping Lane',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90210',
  })

  const [notifications, setNotifications] = useState({
    emailQuotes: true,
    emailBookings: true,
    emailTracking: true,
    smsAlerts: false,
    pushNotifications: true,
    weeklyDigest: true,
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Account Settings</h1>
        <p className="text-slate-400">Manage your profile and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4">
            <div className="flex flex-col items-center mb-6 pb-6 border-b border-slate-700">
              <div className="relative mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-4xl">
                  👤
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>
              <h3 className="font-semibold text-white">{profile.name}</h3>
              <p className="text-sm text-slate-400">{profile.role}</p>
            </div>
            <nav className="space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    activeTab === tab.id
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white mb-6">Personal Information</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleProfileChange}
                        className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                        className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={profile.phone}
                        onChange={handleProfileChange}
                        className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Company</label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        name="company"
                        value={profile.company}
                        onChange={handleProfileChange}
                        className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <h2 className="text-lg font-semibold text-white pt-6 border-t border-slate-700">Shipping Address</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Street Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        name="address"
                        value={profile.address}
                        onChange={handleProfileChange}
                        className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="city"
                      value={profile.city}
                      onChange={handleProfileChange}
                      placeholder="City"
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="state"
                      value={profile.state}
                      onChange={handleProfileChange}
                      placeholder="State"
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="zip"
                      value={profile.zip}
                      onChange={handleProfileChange}
                      placeholder="ZIP"
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="pt-6 flex justify-end">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white mb-6">Notification Preferences</h2>
                
                <div className="space-y-4">
                  {[
                    { key: 'emailQuotes', label: 'Quote confirmations', desc: 'Receive email when quotes are generated' },
                    { key: 'emailBookings', label: 'Booking updates', desc: 'Notifications for booking confirmations and changes' },
                    { key: 'emailTracking', label: 'Tracking alerts', desc: 'Real-time shipment status updates' },
                    { key: 'smsAlerts', label: 'SMS alerts', desc: 'Text message notifications for urgent updates' },
                    { key: 'pushNotifications', label: 'Push notifications', desc: 'Browser push notifications' },
                    { key: 'weeklyDigest', label: 'Weekly digest', desc: 'Summary of your weekly shipping activity' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl">
                      <div>
                        <h3 className="font-medium text-white">{item.label}</h3>
                        <p className="text-sm text-slate-400">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications[item.key as keyof typeof notifications]}
                          onChange={e => setNotifications(prev => ({ ...prev, [item.key]: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white mb-6">Security Settings</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-slate-900/50 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Key className="w-5 h-5 text-slate-400" />
                        <div>
                          <h3 className="font-medium text-white">Password</h3>
                          <p className="text-sm text-slate-400">Last changed 30 days ago</p>
                        </div>
                      </div>
                      <button className="text-blue-400 hover:text-blue-300 font-medium">Change</button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-slate-900/50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-slate-400" />
                        <div>
                          <h3 className="font-medium text-white">Two-factor authentication</h3>
                          <p className="text-sm text-slate-400">Add an extra layer of security</p>
                        </div>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition">
                        Enable
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/50 rounded-xl">
                    <h3 className="font-medium text-white mb-3">Active Sessions</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Chrome on MacOS • Los Angeles, CA</span>
                        <span className="text-green-400">Current</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Mobile App • iPhone</span>
                        <span>2 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white mb-6">Billing & Subscription</h2>
                
                <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-blue-200">Current Plan</p>
                      <h3 className="text-2xl font-bold text-white">Professional</h3>
                    </div>
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">Active</span>
                  </div>
                  <p className="text-blue-200 mb-4">$299/month • Renews Feb 15, 2026</p>
                  <div className="flex gap-3">
                    <button className="bg-white text-blue-600 font-medium py-2 px-4 rounded-lg">Upgrade</button>
                    <button className="bg-white/20 text-white font-medium py-2 px-4 rounded-lg">Manage</button>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-slate-400" />
                      <div>
                        <h3 className="font-medium text-white">•••• •••• •••• 4242</h3>
                        <p className="text-sm text-slate-400">Expires 12/28</p>
                      </div>
                    </div>
                    <button className="text-blue-400 hover:text-blue-300 font-medium">Update</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
