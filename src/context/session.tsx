import { createContext, FunctionComponent } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'
import { useLastFmClient } from './lastfmClient'

export const SessionContext = createContext<{
  session: string | undefined
  setSession: (token: string | undefined) => void
}>({
  session: undefined,
  setSession: () => {}
})

export const SessionContextProvider: FunctionComponent = ({ children }) => {
  const { lastFmClient } = useLastFmClient()
  const [session, setSessionState] = useState<string | undefined>(undefined)

  // 復帰
  useEffect(() => {
    const savedSession = localStorage.getItem(keySession)
    if (savedSession) {
      console.log('[session] restored!', savedSession)
      setSessionState(savedSession)
      lastFmClient.sessionKey = savedSession
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setSession = useCallback((session: string | undefined) => {
    setSessionState(session)
    lastFmClient.sessionKey = session
    if (session) {
      localStorage.setItem(keySession, session)
    } else {
      localStorage.removeItem(keySession)
    }
  }, [])

  return <SessionContext.Provider value={{ session, setSession }}>{children}</SessionContext.Provider>
}

const keySession = 'session'
