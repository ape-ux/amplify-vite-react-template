import { useState } from 'react'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400">Manage your account and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-700/50 pb-2">
        {['profile', 'notifications', 'integrations', 'billing', 'security'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg capitalize transition-colors ${
              activeTab === tab
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:bg-gray-700/50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Profile Settings</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                <input type="text" defaultValue="Flavio" className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Email</label>
                <input type="email" defaultValue="flow@flow247.io" className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Company</label>
                <input type="text" defaultValue="Ape Global" className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Timezone</label>
                <select className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white">
                  <option>America/New_York (EST)</option>
                  <option>America/Los_Angeles (PST)</option>
                  <option>UTC</option>
                </select>
              </div>
            </div>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Save Changes
            </button>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Notification Preferences</h3>
            {[
              { label: 'Quote Requests', desc: 'New quote requests from customers' },
              { label: 'Booking Confirmations', desc: 'When bookings are confirmed' },
              { label: 'LFD Alerts', desc: 'Last free day warnings' },
              { label: 'Container Updates', desc: 'Status changes for tracked containers' },
              { label: 'Weekly Reports', desc: 'Summary of weekly activity' },
            ].map((pref, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
                <div>
                  <p className="text-white font-medium">{pref.label}</p>
                  <p className="text-gray-400 text-sm">{pref.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Connected Integrations</h3>
            {[
              { name: 'Xano', status: 'connected', icon: '🔧' },
              { name: 'Supabase', status: 'connected', icon: '⚡' },
              { name: 'Stripe', status: 'connected', icon: '💳' },
              { name: 'SendGrid', status: 'connected', icon: '📧' },
              { name: 'TAI TMS', status: 'connected', icon: '🚚' },
              { name: 'STG API', status: 'connected', icon: '🚢' },
            ].map((int, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{int.icon}</span>
                  <div>
                    <p className="text-white font-medium">{int.name}</p>
                    <p className="text-green-400 text-sm">✓ {int.status}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-white">Configure</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Billing & Subscription</h3>
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-blue-500/30">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold text-lg">Professional Plan</p>
                  <p className="text-gray-400">$299/month • Renews Feb 15, 2026</p>
                </div>
                <button className="px-4 py-2 bg-white/10 text-white rounded-lg">Upgrade</button>
              </div>
            </div>
            <div className="p-4 bg-gray-700/30 rounded-xl">
              <p className="text-white font-medium mb-2">Payment Method</p>
              <p className="text-gray-400">•••• •••• •••• 4242 (Visa)</p>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Security Settings</h3>
            <div className="space-y-4">
              <button className="w-full text-left p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors">
                <p className="text-white font-medium">Change Password</p>
                <p className="text-gray-400 text-sm">Update your account password</p>
              </button>
              <button className="w-full text-left p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors">
                <p className="text-white font-medium">Two-Factor Authentication</p>
                <p className="text-green-400 text-sm">✓ Enabled</p>
              </button>
              <button className="w-full text-left p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors">
                <p className="text-white font-medium">Active Sessions</p>
                <p className="text-gray-400 text-sm">3 devices logged in</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
