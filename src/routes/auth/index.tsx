import { h, FunctionComponent } from 'preact'
import { RoutableProps } from 'preact-router'
import { useContext } from 'preact/hooks'
import style from './style.module.css'
import { getEnv } from '../../utils/env'
import { SessionContext } from '../../context/session'

const env = getEnv()
const requestAuthUrl = 'https://www.last.fm/api/auth/?api_key='

const Auth: FunctionComponent<RoutableProps> = () => {
  const { token } = useContext(SessionContext)

  const handleRequestAuth = async () => {
    const callbackUrl = `${env.baseUrl}/auth/callback`
    window.location.href = `${requestAuthUrl}${env.LASTFM_API_KEY}&cb=${callbackUrl}`
  }

  return (
    <div class={style.home}>
      <h1>Auth</h1>
      <p>This is Auth page.</p>
      {token ? <p>You have session token: {token}</p> : <p>You don't have session token yet.</p>}

      <h2>Steps</h2>

      <a href="#" class={style.button} onClick={handleRequestAuth}>
        1. Request authorization from the user
      </a>
    </div>
  )
}

export default Auth
