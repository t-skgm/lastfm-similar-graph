import { h } from 'preact'
import { Router } from 'preact-router'
import Header from './components/Header'
import { SessionContextProvider } from './context/session'

import Auth from './routes/auth'
import AuthCallback from './routes/auth-callback'
import Home from './routes/home'

const App = () => (
  <SessionContextProvider>
    <Header />
    <Router>
      <Home path="/" />
      <Auth path="/auth" />
      <AuthCallback path="/auth/callback" />
    </Router>
  </SessionContextProvider>
)

export default App
