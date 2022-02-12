import { h, FunctionComponent } from 'preact'
import { RoutableProps, Link } from 'preact-router'
import { useContext, useEffect } from 'preact/hooks'
import style from './style.module.css'
import { SessionContext } from '../../context/session'
import { useLastFmClient } from '../../context/lastfmClient'

// const requestAuthUrl = 'https://www.last.fm/api/auth/?api_key='

type QueryString = { token?: string }

const AuthCallback: FunctionComponent<RoutableProps & QueryString> = ({ token }) => {
  const { session, setSession } = useContext(SessionContext)
  const { lastFmClient } = useLastFmClient()

  useEffect(() => {
    if (token) {
      lastFmClient
        .request({
          method: 'auth.getSession',
          params: { token }
        })
        .then(res => {
          console.log('auth.getSession res', res)
          setSession(res.session.key)
        })
    }
  }, [lastFmClient, setSession, token])

  return (
    <div class={style.home}>
      <h1>Auth callback</h1>
      <p>You got token! {token}</p>
      <p>And you got session! {session}</p>

      <p>
        Go back to <Link href="/">home page</Link>
      </p>
    </div>
  )
}

export default AuthCallback
