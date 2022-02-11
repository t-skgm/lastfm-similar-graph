import { createContext, FunctionComponent } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'

export const SessionContext = createContext<{
  token: string | undefined
  setToken: (token: string | undefined) => void
}>({
  token: undefined,
  setToken: () => {}
})

export const SessionContextProvider: FunctionComponent = ({ children }) => {
  const [token, setTokenState] = useState<string | undefined>(undefined)

  // 復帰
  useEffect(() => {
    const savedToken = localStorage.getItem(keySessionToken)
    if (savedToken) {
      console.log('[session] restored!', savedToken)
      setTokenState(savedToken)
    }
  }, [])

  const setToken = useCallback((token: string | undefined) => {
    setTokenState(token)
    if (token) {
      localStorage.setItem(keySessionToken, token)
    } else {
      localStorage.removeItem(keySessionToken)
    }
  }, [])

  return <SessionContext.Provider value={{ token, setToken }}>{children}</SessionContext.Provider>
}

export const keySessionToken = 'session:token'
