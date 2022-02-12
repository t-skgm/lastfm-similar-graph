export type ILasfFmClient = {
  sessionKey: string | undefined
  authRequestUrl: string

  request: <Response, Method extends string>(_: { method: Method; params: LasfFmParams }) => Promise<Response>
}

export type LasfFmParams = Record<string, any>

export type LasfFmClientInput = {
  readonly hostname: string
  readonly apiKey: string
  readonly apiSecret: string
  readonly apiUrl?: string
}
