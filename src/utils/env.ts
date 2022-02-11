type Env = {
  LASTFM_API_KEY: string
  LASTFM_SECRET: string
  isDev: boolean
  isProd: boolean
  isSSR: boolean
  baseUrl: string
}

export const getEnv = (): Env => {
  const env = import.meta.env
  if (typeof env.VITE_LASTFM_API_KEY !== 'string') throw new Error('VITE_LASTFM_API_KEY is not set')
  if (typeof env.VITE_LASTFM_SECRET !== 'string') throw new Error('VITE_LASTFM_SECRET is not set')

  return {
    LASTFM_API_KEY: env.VITE_LASTFM_API_KEY,
    LASTFM_SECRET: env.VITE_LASTFM_SECRET,
    isDev: env.DEV,
    isProd: env.PROD,
    isSSR: env.SSR,
    baseUrl: env.BASE_URL
  }
}
