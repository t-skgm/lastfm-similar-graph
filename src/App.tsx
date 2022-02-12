import { h } from 'preact'
import { Router } from 'preact-router'
import Header from './components/Header'
import { LastFmClientContextProvider } from './context/lastfmClient'
import { SessionContextProvider } from './context/session'

import AuthCallback from './routes/auth-callback'
import Home from './routes/home'

const App = () => (
  <LastFmClientContextProvider>
    <SessionContextProvider>
      <Header />
      <Router>
        <Home path="/" />
        <AuthCallback path="/auth/callback" />
      </Router>
    </SessionContextProvider>
  </LastFmClientContextProvider>
)

export default App
