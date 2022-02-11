import { h, FunctionComponent } from 'preact'
import { RoutableProps, Link } from 'preact-router'
import { useContext, useEffect } from 'preact/hooks'
import style from './style.module.css'
import { getEnv } from '../../utils/env'
import { SessionContext } from '../../context/session'

// const env = getEnv()

// const requestAuthUrl = 'https://www.last.fm/api/auth/?api_key='

type QueryString = { token?: string }

const AuthCallback: FunctionComponent<RoutableProps & QueryString> = ({ token: resToken }) => {
  const { token, setToken } = useContext(SessionContext)

  useEffect(() => {
    if (resToken) {
      setToken(resToken)
    }
  }, [resToken, setToken])

  return (
    <div class={style.home}>
      <h1>Auth callback</h1>
      <p>You got session token! {token}</p>
      <p>
        Go back to <Link href="/auth">auth page</Link>
      </p>
    </div>
  )
}

export default AuthCallback
