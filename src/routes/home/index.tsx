import { h, FunctionComponent } from 'preact'
import { RoutableProps } from 'preact-router'
import { useContext, useState, useCallback } from 'preact/hooks'
import style from './style.module.css'
import { SessionContext } from '../../context/session'
import { useLastFmClient } from '../../context/lastfmClient'

const Home: FunctionComponent<RoutableProps> = () => {
  const { session } = useContext(SessionContext)
  const { lastFmClient } = useLastFmClient()
  const [search, setSearch] = useState('')
  const [res, setRes] = useState<any>(null)

  const handleRequestAuth = useCallback(async () => {
    window.location.href = lastFmClient.authRequestUrl
  }, [lastFmClient.authRequestUrl])

  const handleTestRequest = useCallback(async () => {
    try {
      const res = await lastFmClient.request({
        method: 'artist.getSimilar',
        params: { artist: search }
      })
      setRes(res)
      console.log('handleTestRequest', res)
    } catch (e) {
      console.warn(e)
    }
  }, [lastFmClient, search])

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
