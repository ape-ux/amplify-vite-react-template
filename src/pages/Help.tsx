import { useState } from 'react'
import { Search, Book, MessageCircle, FileText, Video, ChevronRight, ExternalLink, Mail, Phone, Clock } from 'lucide-react'

// Help & Support Center

const categories = [
  {
    title: 'Getting Started',
    icon: Book,
    articles: [
      { title: 'Quick Start Guide', time: '5 min read' },
      { title: 'Creating Your First Quote', time: '3 min read' },
      { title: 'Understanding Freight Classes', time: '7 min read' },
      { title: 'Setting Up Notifications', time: '2 min read' },
    ],
  },
  {
    title: 'Rate Shopping',
    icon: FileText,
    articles: [
      { title: 'How to Get the Best Rates', time: '4 min read' },
      { title: 'Understanding Accessorials', time: '6 min read' },
      { title: 'Carrier Comparison Tips', time: '5 min read' },
      { title: 'Saving Favorite Carriers', time: '2 min read' },
    ],
  },
  {
    title: 'Tracking & Dispatch',
    icon: Video,
    articles: [
      { title: 'Real-Time Tracking Guide', time: '4 min read' },
      { title: 'Understanding LFD Alerts', time: '5 min read' },
      { title: 'Container Status Explained', time: '6 min read' },
      { title: 'Dispatch Workflow', time: '8 min read' },
    ],
  },
  {
    title: 'AI Agents',
    icon: MessageCircle,
    articles: [
      { title: 'Meet Your AI Agents', time: '5 min read' },
      { title: 'Using the Chat Assistant', time: '3 min read' },
      { title: 'Automating with AI', time: '7 min read' },
      { title: 'Agent Permissions & Access', time: '4 min read' },
    ],
  },
]

const faqs = [
  {
    q: 'How do I get a freight quote?',
    a: 'Enter your origin/destination ZIP codes, weight, and dimensions in the Rate Shopping page. We\'ll compare rates from 15+ carriers instantly.',
  },
  {
    q: 'What carriers do you support?',
    a: 'We integrate with TAI, Estes, Echo, CH Robinson, TQL, Xenon, ShipEngine, STG, and more. New carriers are added regularly.',
  },
  {
    q: 'How does container tracking work?',
    a: 'We sync with STG and port systems every 4 hours to provide real-time LFD alerts, risk levels, and estimated fees for your containers.',
  },
  {
    q: 'Can I white-label the platform?',
    a: 'Yes! Enterprise plans include white-label options. Contact sales for custom branding.',
  },
  {
    q: 'Is there an API available?',
    a: 'Professional and Enterprise plans include full API access. See our API documentation for details.',
  },
]

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4">How can we help?</h1>
        <p className="text-slate-400 mb-8">Search our knowledge base or browse categories below</p>
        
        {/* Search */}
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search for help articles..."
            className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((category, i) => (
          <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <category.icon className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">{category.title}</h2>
            </div>
            <ul className="space-y-3">
              {category.articles.map((article, j) => (
                <li key={j}>
                  <a
                    href="#"
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-700/50 transition group"
                  >
                    <span className="text-slate-300 group-hover:text-white">{article.title}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">{article.time}</span>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-slate-700/50 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-700/30 transition"
              >
                <span className="font-medium text-white">{faq.q}</span>
                <ChevronRight
                  className={`w-5 h-5 text-slate-400 transition-transform ${
                    expandedFaq === i ? 'rotate-90' : ''
                  }`}
                />
              </button>
              {expandedFaq === i && (
                <div className="px-4 pb-4 text-slate-400">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="font-semibold text-white mb-2">Live Chat</h3>
          <p className="text-sm text-slate-400 mb-4">Chat with our support team in real-time</p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition">
            Start Chat
          </button>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="font-semibold text-white mb-2">Email Support</h3>
          <p className="text-sm text-slate-400 mb-4">Get help via email within 24 hours</p>
          <a
            href="mailto:support@freightflow.ai"
            className="block w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 rounded-xl transition"
          >
            support@freightflow.ai
          </a>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Phone className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="font-semibold text-white mb-2">Phone Support</h3>
          <p className="text-sm text-slate-400 mb-4">Call us Mon-Fri, 9am-6pm EST</p>
          <a
            href="tel:+18005551234"
            className="block w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 rounded-xl transition"
          >
            1-800-555-1234
          </a>
        </div>
      </div>

      {/* API Docs Link */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">API Documentation</h3>
              <p className="text-sm text-slate-400">Integrate FreightFlow Pro into your systems</p>
            </div>
          </div>
          <a
            href="#"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium"
          >
            View Docs
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
        <div className="w-2 h-2 bg-green-500 rounded-full" />
        <span>All systems operational</span>
        <span className="mx-2">•</span>
        <Clock className="w-4 h-4" />
        <span>Average response time: 2 minutes</span>
      </div>
    </div>
  )
}
