type Env = {
  LASTFM_API_KEY: string
  isDev: boolean
  isProd: boolean
  isSSR: boolean
  baseUrl: string
}

export const getEnv = (): Env => {
  const env = import.meta.env
  if (typeof env.VITE_LASTFM_API_KEY !== 'string') throw new Error('LASTFM_API_KEY is not set')

  return {
    LASTFM_API_KEY: env.VITE_LASTFM_API_KEY,
    isDev: env.DEV,
    isProd: env.PROD,
    isSSR: env.SSR,
    baseUrl: env.BASE_URL
  }
}
