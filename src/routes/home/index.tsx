import { h, FunctionComponent } from 'preact'
import { RoutableProps } from 'preact-router'
import { useContext, useState, useCallback } from 'preact/hooks'
import style from './style.module.css'
import { SessionContext } from '../../context/session'
import { useLastFmClient } from '../../context/lastfmClient'
import { LastFmMethodResponseMap } from '../../lib/LastFmClient'

const Home: FunctionComponent<RoutableProps> = () => {
  const { session } = useContext(SessionContext)
  const { lastFmClient } = useLastFmClient()
  const [search, setSearch] = useState('')
  const [resp, setResp] = useState<LastFmMethodResponseMap['artist.getSimilar'] | null>(null)

  const handleRequestAuth = useCallback(async () => {
    window.location.href = lastFmClient.authRequestUrl
  }, [lastFmClient.authRequestUrl])

  const handleTestRequest = useCallback(async () => {
    try {
      const res = await lastFmClient.request({
        method: 'artist.getSimilar',
        params: { artist: search }
      })
      setResp(res)
      console.log('handleTestRequest', res.similarartists)
    } catch (e) {
      console.warn(e)
    }
  }, [lastFmClient, search])

  return (
    <div class={style.wrapper}>
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
      {resp && <p>{JSON.stringify(resp)}</p>}
    </div>
  )
}

export default Home
