import { Authenticator } from '@aws-amplify/ui-react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '@aws-amplify/ui-react/styles.css'

// Layouts
import DashboardLayout from './layouts/DashboardLayout'

// Public Pages
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Pricing from './pages/Pricing'

// Dashboard Pages
import Dashboard from './pages/Dashboard'
import Quotes from './pages/Quotes'
import Shipments from './pages/Shipments'
import Bookings from './pages/Bookings'
import Containers from './pages/Containers'
import Documents from './pages/Documents'
import Dispatch from './pages/Dispatch'
import Agents from './pages/Agents'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import Chat from './pages/Chat'
import RateShop from './pages/RateShop'
import Tracking from './pages/Tracking'
import Profile from './pages/Profile'
import Help from './pages/Help'

function App() {
  return (
    <BrowserRouter basename="/ape-ux">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pricing" element={<Pricing />} />
        
        {/* Authenticated Routes */}
        <Route path="/app/*" element={
          <Authenticator>
            {({ signOut, user }) => (
              <DashboardLayout user={user} signOut={signOut}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/quotes" element={<Quotes />} />
                  <Route path="/rate-shop" element={<RateShop />} />
                  <Route path="/shipments" element={<Shipments />} />
                  <Route path="/tracking" element={<Tracking />} />
                  <Route path="/bookings" element={<Bookings />} />
                  <Route path="/containers" element={<Containers />} />
                  <Route path="/documents" element={<Documents />} />
                  <Route path="/dispatch" element={<Dispatch />} />
                  <Route path="/agents" element={<Agents />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/help" element={<Help />} />
                </Routes>
              </DashboardLayout>
            )}
          </Authenticator>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
