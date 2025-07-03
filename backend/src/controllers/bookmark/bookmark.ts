import { badRequest, ok } from "../helpers"
import { HttpRequest, HttpResponse } from "../protocols"
import {
  BookmarkParams,
  BookmarkReturn,
  IBookmarkController,
  IBookmarkRepository,
  setBookmarkParams,
  setBookmarkReturn,
} from "./protocols"

export class BookmarkController implements IBookmarkController {
  constructor(private readonly BookmarkRepository: IBookmarkRepository) {}

  async getBookmarkShows(
    httpRequest: HttpRequest<BookmarkParams>,
  ): Promise<HttpResponse<BookmarkReturn | string>> {
    try {
      const { movies, tvSeries } =
        await this.BookmarkRepository.getBookmarkedShows(httpRequest.body)

      return ok<BookmarkReturn>({ movies, tvSeries })
    } catch (error) {
      return badRequest("server error")
    }
  }

  async setBookmarkShows(
    httpRequest: HttpRequest<setBookmarkParams>,
  ): Promise<HttpResponse<setBookmarkReturn | string>> {
    try {
      const { bookmarked } = await this.BookmarkRepository.setBookmarkedShows(
        httpRequest.body!,
      )

      return ok<setBookmarkReturn>(bookmarked)
    } catch (error) {
      return badRequest("server error")
    }
  }
}
