import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Building2, Eye, EyeOff, Loader2, Check, AlertCircle } from 'lucide-react'
import { register } from '../lib/api'

// Based on: Register Account (Stitch Project 10287775555252886363)
// Theme: DARK, Primary: #137fec, Font: Inter

interface PasswordStrength {
  score: number
  label: string
  color: string
  checks: {
    length: boolean
    uppercase: boolean
    lowercase: boolean
    number: boolean
    special: boolean
  }
}

export default function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  // Password strength calculator
  const passwordStrength = useMemo((): PasswordStrength => {
    const { password } = formData
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    }
    
    const score = Object.values(checks).filter(Boolean).length
    
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent']
    const colors = ['', 'bg-accent-red', 'bg-accent-orange', 'bg-accent-orange', 'bg-accent-green', 'bg-accent-green']
    
    return {
      score,
      label: labels[score] || '',
      color: colors[score] || '',
      checks,
    }
  }, [formData.password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (passwordStrength.score < 3) {
      setError('Password is too weak. Please use a stronger password.')
      return
    }
    
    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy')
      return
    }
    
    setIsLoading(true)
    setError('')
    
    try {
      // Register with Supabase + sync to Xano
      const result = await register(formData.email, formData.password, {
        name: formData.name,
        company: formData.company,
      })
      
      if (result.user) {
        setStep('success')
      }
    } catch (err: any) {
      console.error('Signup error:', err)
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Success state
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface-primary via-indigo-950/50 to-surface-primary flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-accent-green/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow-green">
            <Check className="w-10 h-10 text-accent-green" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Welcome aboard! 🎉</h2>
          <p className="text-slate-400 mb-8">
            Your account has been created successfully. Check your email to verify your address, then you're ready to go.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="inline-block bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-8 rounded-xl transition shadow-glow-primary"
          >
            Continue to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-primary via-indigo-950/50 to-surface-primary flex items-center justify-center p-8">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center text-2xl shadow-glow-primary">
              🦍
            </div>
            <span className="text-2xl font-bold text-white">FreightFlow Pro</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Create your account</h1>
          <p className="text-slate-400">Start your 14-day free trial. No credit card required.</p>
        </div>

        <div className="bg-surface-secondary/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8">
          {error && (
            <div className="mb-6 p-4 bg-accent-red/10 border border-accent-red/20 rounded-xl text-accent-red text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-surface-primary/50 border border-slate-600 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    placeholder="John Doe"
                    required
                    autoComplete="name"
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
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-surface-primary/50 border border-slate-600 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    placeholder="Acme Inc"
                    autoComplete="organization"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-surface-primary/50 border border-slate-600 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  placeholder="you@company.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-surface-primary/50 border border-slate-600 rounded-xl py-3 pl-12 pr-12 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  placeholder="Min. 8 characters"
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-surface-tertiary rounded-full overflow-hidden flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`flex-1 h-full transition-colors ${
                            i <= passwordStrength.score ? passwordStrength.color : 'bg-surface-tertiary'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400 w-16">{passwordStrength.label}</span>
                  </div>
                  
                  {/* Password requirements */}
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <div className={`flex items-center gap-1 ${passwordStrength.checks.length ? 'text-accent-green' : 'text-slate-500'}`}>
                      {passwordStrength.checks.length ? <Check className="w-3 h-3" /> : <span className="w-3 h-3">•</span>}
                      8+ characters
                    </div>
                    <div className={`flex items-center gap-1 ${passwordStrength.checks.uppercase ? 'text-accent-green' : 'text-slate-500'}`}>
                      {passwordStrength.checks.uppercase ? <Check className="w-3 h-3" /> : <span className="w-3 h-3">•</span>}
                      Uppercase
                    </div>
                    <div className={`flex items-center gap-1 ${passwordStrength.checks.number ? 'text-accent-green' : 'text-slate-500'}`}>
                      {passwordStrength.checks.number ? <Check className="w-3 h-3" /> : <span className="w-3 h-3">•</span>}
                      Number
                    </div>
                    <div className={`flex items-center gap-1 ${passwordStrength.checks.special ? 'text-accent-green' : 'text-slate-500'}`}>
                      {passwordStrength.checks.special ? <Check className="w-3 h-3" /> : <span className="w-3 h-3">•</span>}
                      Special char
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full bg-surface-primary/50 border rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'border-accent-red'
                      : 'border-slate-600'
                  }`}
                  placeholder="Confirm password"
                  required
                  autoComplete="new-password"
                />
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-green" />
                )}
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-slate-600 bg-surface-primary text-primary focus:ring-primary" 
              />
              <span className="text-sm text-slate-400">
                I agree to the <a href="#" className="text-primary hover:text-primary-hover">Terms of Service</a> and <a href="#" className="text-primary hover:text-primary-hover">Privacy Policy</a>
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50 shadow-glow-primary"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary-hover font-medium transition">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
