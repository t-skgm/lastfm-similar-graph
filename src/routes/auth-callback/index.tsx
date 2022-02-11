import { h, FunctionComponent } from 'preact'
import { RoutableProps, Link } from 'preact-router'
import { useContext, useEffect } from 'preact/hooks'
import style from './style.module.css'
import { SessionContext } from '../../context/session'
import { signedFetch } from '../../lib/lastfm'

// const requestAuthUrl = 'https://www.last.fm/api/auth/?api_key='

type QueryString = { token?: string }

const AuthCallback: FunctionComponent<RoutableProps & QueryString> = ({ token }) => {
  const { session, setSession } = useContext(SessionContext)

  useEffect(() => {
    if (token) {
      signedFetch('auth.getSession', { token }).then((res: GetSessionRes) => {
        console.log('auth.getSession res', res)
        setSession(res.session.key)
      })
    }
  }, [setSession, token])

  return (
    <div class={style.home}>
      <h1>Auth callback</h1>
      <p>You got token! {token}</p>
      <p>And you got session! {session}</p>

      <p>
        Go back to <Link href="/auth">auth page</Link>
      </p>
    </div>
  )
}

type GetSessionRes = {
  session: {
    key: string
    name: string
    subscriber: number
  }
}

export default AuthCallback
