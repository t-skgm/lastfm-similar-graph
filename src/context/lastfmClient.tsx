import { createContext, FunctionComponent } from 'preact'
import { useContext } from 'preact/hooks'
import { LastFmClient } from '../lib/LastFmClient'
import { getEnv } from '../utils/env'

const env = getEnv()

const client = LastFmClient.create({
  apiKey: env.LASTFM_API_KEY,
  apiSecret: env.LASTFM_SECRET,
  hostname: env.isDev ? 'http://localhost:3000' : 'https://lastfm-similar-graph.pages.dev/'
})

export const LastFmClientContext = createContext<{
  lastFmClient: LastFmClient
}>({
  lastFmClient: client
})

export const LastFmClientContextProvider: FunctionComponent = ({ children }) => {
  return <LastFmClientContext.Provider value={{ lastFmClient: client }}>{children}</LastFmClientContext.Provider>
}

export const useLastFmClient = () => useContext(LastFmClientContext)
