import { HttpRequest, HttpResponse } from "../protocols"

export interface BookmarkParams {
  id: string
  token: string
}

export interface setBookmarkParams {
  title: string
  id: string
  token: string
}

export interface BookmarkReturn {
  data: string[]
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
