import { Link } from 'react-router-dom'
import { Check, Zap, Building2, Rocket, HelpCircle } from 'lucide-react'

// Based on: Subscription Plans (Stitch Project 3208357068907154718)
// Theme: DARK, Font: WORK_SANS, Accent: #1fc75c

const plans = [
  {
    name: 'Starter',
    price: '$99',
    period: '/month',
    description: 'Perfect for small shippers getting started',
    icon: <Zap className="w-6 h-6" />,
    color: 'from-blue-500 to-blue-600',
    features: [
      '100 quotes per month',
      '3 AI agents (Email Parser, Pricing, Booking)',
      'Basic container tracking',
      'Email support',
      'Standard analytics',
      'Single user',
    ],
    limitations: [
      'No API access',
      'No custom agents',
      'No white-label',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Professional',
    price: '$299',
    period: '/month',
    description: 'For growing logistics operations',
    icon: <Building2 className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-600',
    features: [
      '1,000 quotes per month',
      'All 8 AI agents',
      'Full STG LFD tracking',
      'Priority support (chat + phone)',
      'Advanced analytics & reporting',
      'Up to 5 team members',
      'API access',
      'Webhook notifications',
      'Custom rate rules',
    ],
    limitations: [],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large-scale freight operations',
    icon: <Rocket className="w-6 h-6" />,
    color: 'from-purple-500 to-purple-600',
    features: [
      'Unlimited quotes',
      'Custom AI agents',
      'Dedicated account manager',
      '24/7 premium support',
      'White-label option',
      'Unlimited team members',
      'Custom integrations',
      'SLA guarantee (99.9%)',
      'On-premise deployment option',
      'Security audit reports',
    ],
    limitations: [],
    cta: 'Contact Sales',
    popular: false,
  },
]

const faqs = [
  {
    q: 'What counts as a quote?',
    a: 'Each rate shopping request that returns carrier options counts as one quote. Multi-carrier responses from a single request count as one quote.',
  },
  {
    q: 'Can I switch plans anytime?',
    a: 'Yes! Upgrade instantly, downgrade at the end of your billing cycle. Pro-rated credits apply.',
  },
  {
    q: 'What happens if I exceed my quote limit?',
    a: 'We\'ll notify you at 80% usage. Overages are billed at $0.50/quote for Starter, $0.25/quote for Professional.',
  },
  {
    q: 'Do you offer annual billing?',
    a: 'Yes! Annual plans get 2 months free. Contact us for annual pricing.',
  },
]

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <nav className="border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-xl">🦍</span>
              </div>
              <span className="text-xl font-bold">FreightFlow Pro</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-slate-300 hover:text-white transition">Login</Link>
              <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Start free for 14 days. No credit card required. Scale as your business grows.
        </p>
      </section>

      {/* Plans */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative bg-slate-800/50 border rounded-3xl p-8 ${
                  plan.popular ? 'border-green-500 scale-105 shadow-2xl shadow-green-500/10' : 'border-slate-700/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <div className={`w-14 h-14 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mb-6`}>
                  {plan.icon}
                </div>

                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-slate-400">{plan.period}</span>
                </div>
                <p className="text-slate-400 mb-8">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-400" />
                      </div>
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limit, j) => (
                    <li key={j} className="flex items-start gap-3 text-slate-500">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs">✕</span>
                      </div>
                      <span>{limit}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.name === 'Enterprise' ? '/contact' : '/signup'}
                  className={`block text-center py-3 rounded-xl font-semibold transition ${
                    plan.popular
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500'
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Compare Plans</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold">Starter</th>
                  <th className="text-center py-4 px-4 font-semibold text-green-400">Professional</th>
                  <th className="text-center py-4 px-4 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Monthly quotes', '100', '1,000', 'Unlimited'],
                  ['AI agents', '3', '8', 'Custom'],
                  ['Team members', '1', '5', 'Unlimited'],
                  ['Container tracking', 'Basic', 'Full STG', 'Full + Custom'],
                  ['API access', '✕', '✓', '✓'],
                  ['Webhooks', '✕', '✓', '✓'],
                  ['Custom rules', '✕', '✓', '✓'],
                  ['White-label', '✕', '✕', '✓'],
                  ['SLA guarantee', '✕', '✕', '99.9%'],
                  ['Support', 'Email', 'Priority', '24/7 Dedicated'],
                ].map(([feature, starter, pro, enterprise], i) => (
                  <tr key={i} className="border-b border-slate-700/50">
                    <td className="py-4 px-4 text-slate-300">{feature}</td>
                    <td className="text-center py-4 px-4 text-slate-400">{starter}</td>
                    <td className="text-center py-4 px-4 text-green-400">{pro}</td>
                    <td className="text-center py-4 px-4 text-slate-400">{enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                    <p className="text-slate-400">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-green-100 text-lg mb-8">Start your 14-day free trial today. No credit card required.</p>
          <Link
            to="/signup"
            className="inline-block bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-8 px-4 text-center text-slate-400 text-sm">
        © 2026 Ape Global. All rights reserved.
      </footer>
    </div>
  )
}
