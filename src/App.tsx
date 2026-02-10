import { Authenticator } from '@aws-amplify/ui-react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '@aws-amplify/ui-react/styles.css'
import DashboardLayout from './layouts/DashboardLayout'
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

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <BrowserRouter basename="/ape-ux">
          <DashboardLayout user={user} signOut={signOut}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/quotes" element={<Quotes />} />
              <Route path="/shipments" element={<Shipments />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/containers" element={<Containers />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/dispatch" element={<Dispatch />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </DashboardLayout>
        </BrowserRouter>
      )}
    </Authenticator>
  )
}

export default App
