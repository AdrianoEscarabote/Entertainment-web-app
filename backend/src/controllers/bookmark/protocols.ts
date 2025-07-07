import { HttpRequest, HttpResponse } from "../protocols"

export interface BookmarkParams {
  id: string
  token: string
}

export interface setBookmarkParams {
  show_type: "movies" | "tv-series"
  show_id: string
  id: string
  token: string
}

export interface BookmarkReturn {
  movies: string[]
  tvSeries: string[]
}

export interface setBookmarkReturn {
  bookmarked: boolean
}

export interface IBookmarkRepository {
  getBookmarkedShows(params: unknown): Promise<BookmarkReturn>
  setBookmarkedShows(params: setBookmarkParams): Promise<setBookmarkReturn>
}

export interface IBookmarkController {
  getBookmarkShows(
    httpRequest: HttpRequest<unknown>,
  ): Promise<HttpResponse<unknown>>

  setBookmarkShows(
    httpRequest: HttpRequest<unknown>,
  ): Promise<HttpResponse<unknown>>
}
