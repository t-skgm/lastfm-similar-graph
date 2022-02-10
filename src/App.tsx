import { h } from 'preact'
import { Router } from 'preact-router'
import Header from './components/Header'

import Auth from './routes/auth'
import Home from './routes/home'
import Profile from './routes/profile'

const App = () => (
  <div id="app">
    <Header />
    <Router>
      <Home path="/" />
      <Auth path="/auth" />
      <Profile path="/profile/" user="me" />
      <Profile path="/profile/:user" />
    </Router>
  </div>
)

export default App
