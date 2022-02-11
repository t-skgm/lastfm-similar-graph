import { h, FunctionComponent } from 'preact'
import { RoutableProps } from 'preact-router'
import { useContext, useState } from 'preact/hooks'
import style from './style.module.css'
import { getEnv } from '../../utils/env'
import { SessionContext } from '../../context/session'
import { signedFetch } from '../../lib/lastfm'

const env = getEnv()
const requestAuthUrl = 'https://www.last.fm/api/auth/?api_key='
const hostname = env.isDev ? 'http://localhost:3000' : 'https://lastfm-similar-graph.pages.dev/'

const Home: FunctionComponent<RoutableProps> = () => {
  const { session } = useContext(SessionContext)
  const [search, setSearch] = useState('')
  const [res, setRes] = useState<any>(null)

  const handleRequestAuth = async () => {
    const callbackUrl = `${hostname}/auth/callback`
    window.location.href = `${requestAuthUrl}${env.LASTFM_API_KEY}&cb=${callbackUrl}`
  }

  const handleTestRequest = async () => {
    try {
      const res = await signedFetch('artist.getSimilar', {
        artist: search
      })
      setRes(res)
      console.log('handleTestRequest', res)
    } catch (e) {
      console.warn(e)
    }
  }

  return (
    <div class={style.home}>
      <h1>Home</h1>
      <p>This is Home page.</p>
      {session ? <p>You have session: {session}</p> : <p>You don't have session yet.</p>}

      <h2>Steps</h2>

      <p>
        <a href="#" class={style.button} onClick={handleRequestAuth}>
          1. Request authorization from the user
        </a>
      </p>

      <p>
        <a href="#" class={style.button} onClick={handleTestRequest}>
          2. Test Request: Get similar artists
        </a>
        <input
          type="text"
          value={search}
          onChange={e => {
            setSearch((e.target as HTMLInputElement)?.value)
          }}
        />
      </p>
      {res && <p>{JSON.stringify(res)}</p>}
    </div>
  )
}

export default Home
