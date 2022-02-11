import { createContext, FunctionComponent } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'

export const SessionContext = createContext<{
  session: string | undefined
  setSession: (token: string | undefined) => void
}>({
  session: undefined,
  setSession: () => {}
})

export const SessionContextProvider: FunctionComponent = ({ children }) => {
  const [session, setTokenState] = useState<string | undefined>(undefined)

  // 復帰
  useEffect(() => {
    const savedSession = localStorage.getItem(keySession)
    if (savedSession) {
      console.log('[session] restored!', savedSession)
      setTokenState(savedSession)
    }
  }, [])

  const setSession = useCallback((token: string | undefined) => {
    setTokenState(token)
    if (token) {
      localStorage.setItem(keySession, token)
    } else {
      localStorage.removeItem(keySession)
    }
  }, [])

  return <SessionContext.Provider value={{ session, setSession }}>{children}</SessionContext.Provider>
}

export const keySession = 'session'
