import { getEnv } from '../utils/env'
import md5 from 'md5'

const env = getEnv()

const apiRoot = 'http://ws.audioscrobbler.com/2.0/'

export const signedFetch = async (method: string, params: Record<string, any> = {}, sessionKey?: string) => {
  params.method = method
  params.api_key = env.LASTFM_API_KEY
  if (sessionKey) params.sk = sessionKey

  // sign!
  params.api_sig = getApiSignature(params)

  // set format after sign
  params.format = 'json'

  const query = buildQueryStr(params)
  const res = await fetch(`${apiRoot}?${query}`)
  return res.json()
}

const getApiSignature = (params: Record<string, any>) => {
  const keys = Object.keys(params)
  let string = ''

  keys.sort()
  keys.forEach(key => {
    string += key + params[key]
  })

  string += env.LASTFM_SECRET

  /* Needs lastfm.api.md5.js. */
  return md5(string)
}

const buildQueryStr = (params: Record<string, any>) => {
  const array = []
  for (const param in params) {
    array.push(`${encodeURIComponent(param)}=${encodeURIComponent(params[param])}`)
  }
  const query = array.join('&').replace(/%20/g, '+')
  return query
}
