import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader2, Sparkles, Package, Truck, Ship, FileText, Plus } from 'lucide-react'

// Based on: AI Chat Interface (Stitch Project 11922345258539822073)
// Theme: DARK, Font: SPACE_GROTESK, Accent: #f59f0a

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  agent?: string
}

const agents = [
  { id: 'manager', name: 'Manager Agent', emoji: '👔', desc: 'General inquiries & orchestration' },
  { id: 'pricing', name: 'Pricing Agent', emoji: '💰', desc: 'Quotes & rate shopping' },
  { id: 'booking', name: 'Booking Agent', emoji: '📦', desc: 'Book shipments' },
  { id: 'dispatch', name: 'Dispatch Agent', emoji: '🚛', desc: 'Tracking & LFD alerts' },
  { id: 'customer', name: 'Customer Service', emoji: '💬', desc: 'Support & account help' },
]

const quickActions = [
  { icon: <Package className="w-4 h-4" />, label: 'Get a Quote', prompt: 'I need a freight quote' },
  { icon: <Truck className="w-4 h-4" />, label: 'Track Shipment', prompt: 'Track my shipment' },
  { icon: <Ship className="w-4 h-4" />, label: 'Container Status', prompt: 'Check my container status' },
  { icon: <FileText className="w-4 h-4" />, label: 'Get BOL', prompt: 'I need a copy of my BOL' },
]

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "👋 Hello! I'm your FreightFlow AI assistant. I can help you with:\n\n• Getting freight quotes\n• Tracking shipments\n• Checking container status\n• Booking shipments\n• Document requests\n\nHow can I help you today?",
      timestamp: new Date(),
      agent: 'manager',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState('manager')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        quote: "I'd be happy to help you get a quote! Please provide:\n\n📍 **Origin ZIP:** (e.g., 90210)\n📍 **Destination ZIP:** (e.g., 10001)\n📦 **Weight:** (in lbs)\n📐 **Dimensions:** (optional)\n🔢 **Freight Class:** (if known)\n\nOr just tell me what you're shipping and where!",
        track: "I can track your shipment! Please provide one of:\n\n• **PRO Number** (carrier reference)\n• **BOL Number**\n• **Shipment ID** from FreightFlow\n\nI'll pull real-time status from the carrier.",
        container: "Let me check your container status. Please provide:\n\n• **Container Number** (e.g., MSCU1234567)\n\nI'll show you:\n• Current location & status\n• LFD dates (pier & warehouse)\n• Estimated fees\n• Risk level",
        bol: "I can help you get your BOL! Please provide:\n\n• **Shipment ID** or **PRO Number**\n\nI'll retrieve the document and send you a download link.",
      }

      let response = "I understand. Let me help you with that. Could you provide more details about what you need?"
      
      const lowerText = messageText.toLowerCase()
      if (lowerText.includes('quote') || lowerText.includes('price') || lowerText.includes('rate')) {
        response = responses.quote
      } else if (lowerText.includes('track') || lowerText.includes('where')) {
        response = responses.track
      } else if (lowerText.includes('container') || lowerText.includes('lfd')) {
        response = responses.container
      } else if (lowerText.includes('bol') || lowerText.includes('document')) {
        response = responses.bol
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        agent: selectedAgent,
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-slate-700/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-white">AI Assistant</h1>
              <p className="text-sm text-slate-400">Powered by FreightFlow AI</p>
            </div>
          </div>
          <button className="p-2 hover:bg-slate-800 rounded-lg transition">
            <Plus className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Agent Selector */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {agents.map(agent => (
            <button
              key={agent.id}
              onClick={() => setSelectedAgent(agent.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition ${
                selectedAgent === agent.id
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
              }`}
            >
              <span>{agent.emoji}</span>
              <span>{agent.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                message.role === 'user'
                  ? 'bg-blue-600'
                  : 'bg-gradient-to-br from-amber-500 to-orange-600'
              }`}
            >
              {message.role === 'user' ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Bot className="w-4 h-4 text-white" />
              )}
            </div>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-200'
              }`}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
              <div
                className={`text-xs mt-2 ${
                  message.role === 'user' ? 'text-blue-200' : 'text-slate-500'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {message.agent && ` • ${agents.find(a => a.id === message.agent)?.name}`}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-slate-800 rounded-2xl px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
              <span className="text-slate-400">Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <div className="flex-shrink-0 px-4 pb-4">
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, i) => (
              <button
                key={i}
                onClick={() => handleSend(action.prompt)}
                className="flex items-center gap-3 p-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl text-left transition"
              >
                <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-400">
                  {action.icon}
                </div>
                <span className="text-sm text-slate-300">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex-shrink-0 border-t border-slate-700/50 p-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              rows={1}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 pr-12 text-white placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
            />
          </div>
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 rounded-xl flex items-center justify-center text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
