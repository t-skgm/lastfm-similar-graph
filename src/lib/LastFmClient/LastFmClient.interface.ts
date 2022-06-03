/* eslint-disable @typescript-eslint/no-explicit-any */

export type ILasfFmClient = {
  sessionKey: string | undefined
  authRequestUrl: string

  request: <Method extends LastFmMethod>(_: {
    method: Method
    params: LastFmParamsMap[Method]
  }) => Promise<LastFmMethodResponseMap[Method]>
}

export type LasfFmClientInput = {
  readonly hostname: string
  readonly apiKey: string
  readonly apiSecret: string
  readonly apiUrl?: string
}

export type LastFmParamsMap = {
  [Method in LastFmMethod]: LastFmParamsBase<Method> & {
    [param: string]: string | number | undefined
  }
}

export type LasfFmParams = Record<string, any>

type LastFmParamsBase<Method extends LastFmMethod> = {
  method?: Method
  api_key?: string
  sk?: string
}

export type LastFmMethodResponseMap = {
  'album.addTags': WriteResult
  'album.getInfo': {
    album: AlbumInfo
  }
  'album.getTags': any
  'album.getTopTags': any
  'album.removeTag': WriteResult
  'album.search': SearchResult<{
    albummatches: {
      album: Album[]
    }
  }>
  'artist.addTags': WriteResult
  'artist.getCorrection': any
  'artist.getInfo': {
    artist: ArtistInfo
  }
  'artist.getSimilar': {
    similarartists: {
      artist: SimilarArtist[]
    }
  }
  'artist.getTags': any
  'artist.getTopAlbums': any
  'artist.getTopTags': any
  'artist.getTopTracks': any
  'artist.removeTag': WriteResult
  'artist.search': SearchResult<{
    artistmatches: {
      artist: Artist[]
    }
  }>
  'auth.getMobileSession': any
  'auth.getSession': {
    session: {
      key: string
      name: string
      subscriber: number
    }
  }
  'auth.getToken': any
  'chart.getTopArtists': any
  'chart.getTopTags': any
  'chart.getTopTracks': any
  'geo.getTopArtists': any
  'geo.getTopTracks': any
  'library.getArtists': any
  'tag.getInfo': any
  'tag.getSimilar': any
  'tag.getTopAlbums': any
  'tag.getTopArtists': any
  'tag.getTopTags': any
  'tag.getTopTracks': any
  'tag.getWeeklyChartList': any
  'track.addTags': WriteResult
  'track.getCorrection': any
  'track.getInfo': any
  'track.getSimilar': any
  'track.getTags': any
  'track.getTopTags': any
  'track.love': WriteResult
  'track.removeTag': WriteResult
  'track.scrobble': any
  'track.search': any
  'track.unlove': WriteResult
  'track.updateNowPlaying': any
  'user.getFriends': any
  'user.getInfo': any
  'user.getLovedTracks': any
  'user.getPersonalTags': any
  'user.getRecentTracks': any
  'user.getTopAlbums': any
  'user.getTopArtists': any
  'user.getTopTags': any
  'user.getTopTracks': any
  'user.getWeeklyAlbumChart': any
  'user.getWeeklyArtistChart': any
  'user.getWeeklyChartList': any
  'user.getWeeklyTrackChart': any
}

export type LastFmMethod = LastFmReadMethod | LastFmWriteMethod

export type LastFmWriteMethod =
  | 'album.addTags'
  | 'album.removeTag'
  | 'artist.addTags'
  | 'artist.removeTag'
  | 'track.addTags'
  | 'track.love'
  | 'track.removeTag'
  | 'track.scrobble'
  | 'track.unlove'
  | 'track.updateNowPlaying'

export type LastFmReadMethod =
  | 'album.getInfo'
  | 'album.getTags'
  | 'album.getTopTags'
  | 'album.search'
  | 'artist.getCorrection'
  | 'artist.getInfo'
  | 'artist.getSimilar'
  | 'artist.getTags'
  | 'artist.getTopAlbums'
  | 'artist.getTopTags'
  | 'artist.getTopTracks'
  | 'artist.search'
  | 'auth.getMobileSession'
  | 'auth.getSession'
  | 'auth.getToken'
  | 'chart.getTopArtists'
  | 'chart.getTopTags'
  | 'chart.getTopTracks'
  | 'geo.getTopArtists'
  | 'geo.getTopTracks'
  | 'library.getArtists'
  | 'tag.getInfo'
  | 'tag.getSimilar'
  | 'tag.getTopAlbums'
  | 'tag.getTopArtists'
  | 'tag.getTopTags'
  | 'tag.getTopTracks'
  | 'tag.getWeeklyChartList'
  | 'track.getCorrection'
  | 'track.getInfo'
  | 'track.getSimilar'
  | 'track.getTags'
  | 'track.getTopTags'
  | 'track.search'
  | 'user.getFriends'
  | 'user.getInfo'
  | 'user.getLovedTracks'
  | 'user.getPersonalTags'
  | 'user.getRecentTracks'
  | 'user.getTopAlbums'
  | 'user.getTopArtists'
  | 'user.getTopTags'
  | 'user.getTopTracks'
  | 'user.getWeeklyAlbumChart'
  | 'user.getWeeklyArtistChart'
  | 'user.getWeeklyChartList'
  | 'user.getWeeklyTrackChart'

type Artist = {
  name: string
  listeners?: string
  mbid: string
  url: string
  streamable: BooleanString
  image: Image[]
}

type SimilarArtist = Artist & {
  match: FloorString
}

type ArtistInfo = Artist & {
  ontour: BooleanString
  stats: {
    listeners: IntString
    playcount: IntString
  }
  similar: {
    artist: {
      name: string
      url: string
      image: Image[]
    }[]
  }
  tags: {
    tag: Tag[]
  }
  bio: {
    links: {
      link: {
        '#text': string
        rel: 'original'
        href: string
      }
    }
    published: string
    summary: string
    content: string
  }
}

type Album = {
  name: string
  artist: string
  mbid: string
  url: string
  streamable: BooleanString
  image: Image[]
}

type AlbumInfo = Album & {
  playcount: IntString
  tags: {
    tag: Tag[]
  }
  tracks: {
    track: Track[]
  }
  wiki: {
    published: string
    summary: string
    content: string
  }
}

type Tag = {
  url: string
  name: string
}

type Track = {
  '@attr': {
    rank: number
  }
  streamable: {
    fulltrack: BooleanString
    '#text': '0'
  }
  duration: number
  url: string
  name: string
  artist: {
    url: string
    name: string
    mbid: string
  }
}

type BooleanString = '0' | '1'
type IntString = string
type FloorString = string
type ImageSize = 'small' | 'medium' | 'large' | 'extralarge' | 'mega'

type Image = {
  /** Image URL */
  '#text': string
  size: ImageSize
}

type SearchResult<Matched> = {
  results: {
    'opensearch:Query': {
      '#text': string
      role: 'request'
      searchTerms: string
      startPage: IntString
    }
    'opensearch:totalResults': IntString
    'opensearch:startIndex': IntString
    'opensearch:itemsPerPage': IntString
  } & Matched
}

type WriteResult = { lfm: { status: 'ok' } }

export type ErrorRes = {
  error: number
  links: []
  message: string
}
