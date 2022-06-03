import md5 from 'md5'
import { ILasfFmClient, LasfFmClientInput, LasfFmParams } from './LastFmClient.interface'

export class LastFmClient implements ILasfFmClient {
  private constructor(
    private readonly hostname: LasfFmClientInput['hostname'],
    private readonly apiKey: LasfFmClientInput['apiKey'],
    private readonly apiSecret: LasfFmClientInput['apiSecret'],
    private readonly apiUrl: LasfFmClientInput['apiUrl']
  ) {}

  sessionKey: string | undefined = undefined

  static create(input: LasfFmClientInput) {
    return new LastFmClient(input.hostname, input.apiKey, input.apiSecret, input.apiUrl ?? apiRoot)
  }

  get authRequestUrl() {
    const callbackUrl = `${this.hostname}/auth/callback`
    return `${authRequestUrlBase}?api_key=${this.apiKey}&cb=${callbackUrl}`
  }

  request: ILasfFmClient['request'] = async ({ method, params }) => {
    params.method = method
    params.api_key = this.apiKey
    if (this.sessionKey) params.sk = this.sessionKey

    const query = _buildQueryStr({
      ...params,
      // set format to 'json', not 'xml'
      format: 'json',
      api_sig: this.getApiSignature(params)
    })

    const res = await fetch(`${this.apiUrl}?${query}`)
    return res.json()
  }

  private getApiSignature = (params: LasfFmParams) => {
    const keys = Object.keys(params)
    let string = ''

    // order by alphabet
    keys.sort()
    keys.forEach(key => {
      string += key + params[key]
    })

    string += this.apiSecret

    return md5(string)
  }
}

const apiRoot = 'https://ws.audioscrobbler.com/2.0/'
const authRequestUrlBase = 'https://www.last.fm/api/auth/'

const _buildQueryStr = (params: LasfFmParams) => {
  const array = []
  for (const param in params) {
    array.push(`${encodeURIComponent(param)}=${encodeURIComponent(params[param])}`)
  }
  const query = array.join('&').replace(/%20/g, '+')
  return query
}
