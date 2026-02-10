import { Link } from 'react-router-dom'
import { Truck, Ship, Plane, Zap, Shield, Clock, ChevronRight, Star, Globe } from 'lucide-react'

// Based on: APE Global Marketing Homepage (Stitch Project 10181034595161832539)
// Theme: LIGHT, Font: MANROPE, Accent: #137fec

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-700/50 backdrop-blur-sm fixed w-full z-50 bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold">🦍</span>
              </div>
              <span className="text-xl font-bold">FreightFlow Pro</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-300 hover:text-white transition">Features</a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition">Pricing</a>
              <a href="#agents" className="text-slate-300 hover:text-white transition">AI Agents</a>
              <a href="#integrations" className="text-slate-300 hover:text-white transition">Integrations</a>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-slate-300 hover:text-white transition">Login</Link>
              <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-8">
            <Zap className="w-4 h-4" />
            AI-Powered Freight Management
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
            Ship Smarter, Not Harder
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12">
            FreightFlow Pro combines intelligent AI agents with real-time carrier APIs to automate your entire freight operation. Get instant quotes, book shipments, and track containers—all from one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold text-lg transition flex items-center justify-center gap-2">
              Start Free Trial <ChevronRight className="w-5 h-5" />
            </Link>
            <a href="#demo" className="border border-slate-600 hover:border-slate-500 px-8 py-4 rounded-xl font-semibold text-lg transition">
              Watch Demo
            </a>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-slate-500 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              SOC 2 Compliant
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              24/7 Support
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              4.9/5 Rating
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50K+', label: 'Shipments Managed' },
              { value: '99.9%', label: 'Uptime SLA' },
              { value: '30%', label: 'Cost Savings' },
              { value: '<60s', label: 'Time to Quote' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              From instant rate shopping to automated dispatch—FreightFlow Pro handles it all.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Truck className="w-8 h-8" />, title: 'LTL Rate Shopping', desc: 'Compare rates from 15+ carriers instantly. Auto-exclude problematic carriers.' },
              { icon: <Ship className="w-8 h-8" />, title: 'Container Tracking', desc: 'Real-time LFD alerts, risk monitoring, and automatic fee estimates.' },
              { icon: <Plane className="w-8 h-8" />, title: 'Air & Ocean', desc: 'Full multimodal support with IPI door delivery quotes.' },
              { icon: <Zap className="w-8 h-8" />, title: 'AI Agents', desc: '8 specialized agents for pricing, booking, dispatch, and customer service.' },
              { icon: <Globe className="w-8 h-8" />, title: 'Carrier Network', desc: 'Direct integrations with TAI, Echo, Estes, CHR, TQL, and more.' },
              { icon: <Shield className="w-8 h-8" />, title: 'Enterprise Security', desc: 'JWT auth, RLS policies, tenant isolation, and audit logging.' },
            ].map((feature, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition">
                <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section id="agents" className="py-24 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meet Your AI Agents</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Specialized AI agents work 24/7 to automate your freight operations.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: '📧', name: 'Email Parser', desc: 'Extracts shipment data from emails automatically' },
              { emoji: '💰', name: 'Pricing Agent', desc: 'Multi-carrier rate shopping and margin optimization' },
              { emoji: '📦', name: 'Booking Agent', desc: 'Converts quotes to bookings with carrier APIs' },
              { emoji: '🚛', name: 'Dispatch Agent', desc: 'LFD tracking, pickup scheduling, exceptions' },
              { emoji: '💬', name: 'Customer Service', desc: 'Handles inquiries and account management' },
              { emoji: '👔', name: 'Manager Agent', desc: 'Orchestrates all agents and escalates issues' },
              { emoji: '🔧', name: 'Backend Agent', desc: 'Database ops, debugging, system health' },
              { emoji: '📊', name: 'Analytics Agent', desc: 'Reports, KPIs, and business insights' },
            ].map((agent, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6 text-center hover:scale-105 transition">
                <div className="text-4xl mb-4">{agent.emoji}</div>
                <h3 className="font-semibold mb-2">{agent.name}</h3>
                <p className="text-slate-400 text-sm">{agent.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-slate-400 text-lg">Start free, scale as you grow.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { 
                name: 'Starter', 
                price: '$99', 
                desc: 'For small shippers',
                features: ['100 quotes/month', '3 AI agents', 'Email support', 'Basic analytics'],
              },
              { 
                name: 'Professional', 
                price: '$299', 
                desc: 'For growing businesses',
                features: ['1,000 quotes/month', 'All 8 AI agents', 'Priority support', 'Advanced analytics', 'API access'],
                popular: true,
              },
              { 
                name: 'Enterprise', 
                price: 'Custom', 
                desc: 'For large operations',
                features: ['Unlimited quotes', 'Custom agents', 'Dedicated support', 'White-label option', 'SLA guarantee'],
              },
            ].map((plan, i) => (
              <div key={i} className={`relative bg-slate-800/50 border rounded-2xl p-8 ${plan.popular ? 'border-blue-500 scale-105' : 'border-slate-700/50'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-2">{plan.price}<span className="text-lg text-slate-400">/mo</span></div>
                <p className="text-slate-400 mb-6">{plan.desc}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-slate-300">
                      <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 text-xs">✓</div>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/signup" 
                  className={`block text-center py-3 rounded-lg font-medium transition ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-700 hover:bg-slate-600'}`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Freight?</h2>
          <p className="text-blue-100 text-lg mb-8">Join thousands of shippers saving time and money with FreightFlow Pro.</p>
          <Link to="/signup" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition">
            Start Your Free Trial <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-sm">🦍</span>
                </div>
                <span className="font-bold">FreightFlow Pro</span>
              </div>
              <p className="text-slate-400 text-sm">AI-powered freight management for modern logistics.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">API</a></li>
                <li><a href="#" className="hover:text-white transition">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700/50 mt-12 pt-8 text-center text-slate-400 text-sm">
            © 2026 Ape Global. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
