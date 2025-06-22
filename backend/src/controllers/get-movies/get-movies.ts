import { Response } from "express"
import { HttpRequest, HttpResponse, IGetMoviesController } from "../protocols"
import {
  GetMoviesParam,
  GetMoviesReturn,
  IGetMoviesRepository,
} from "./protocols"
import { badRequest, notFound, ok } from "../helpers"

export class GetMoviesController implements IGetMoviesController {
  constructor(private readonly GetMoviesRepository: IGetMoviesRepository) {}

  async getMovies(
    httpRequest: HttpRequest<GetMoviesParam>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    res: Response<unknown>,
  ): Promise<HttpResponse<GetMoviesReturn | string>> {
    try {
      const { types } = httpRequest.body!

      if (!types || !Array.isArray(types)) {
        return badRequest("Types parameter must be an array")
      }

      const promises = types.map(async (type) => {
        switch (type) {
          case "popular":
            return [
              "popular",
              await this.GetMoviesRepository.getPopularMovies(
                httpRequest.body as GetMoviesParam,
              ),
            ]
          case "trending":
            return [
              "trending",
              await this.GetMoviesRepository.getTrendingMovies(
                httpRequest.body as GetMoviesParam,
              ),
            ]
          case "now-playing":
            return [
              "nowPlaying",
              await this.GetMoviesRepository.getNowPlayingMovies(
                httpRequest.body as GetMoviesParam,
              ),
            ]
          case "top-rated":
            return [
              "topRated",
              await this.GetMoviesRepository.getTopRatedMovies(
                httpRequest.body as GetMoviesParam,
              ),
            ]
          case "upcoming":
            return [
              "upcoming",
              await this.GetMoviesRepository.getUpcomingMovies(
                httpRequest.body as GetMoviesParam,
              ),
            ]
          case "movie-details":
            return [
              "movieDetails",
              await this.GetMoviesRepository.getMovieDetails(
                httpRequest.body as GetMoviesParam,
              ),
            ]
          default:
            throw new Error(`Unknown type: ${type}`)
        }
      })

      const entries = await Promise.all(promises)
      const result = Object.fromEntries(entries)

      if (types.includes("movie-details")) {
        const { movieDetails } = result
        return ok(movieDetails)
      }

      return ok(result)
    } catch (error) {
      return notFound()
    }
  }

  async getMovieGenreList(
    httpRequest: HttpRequest<GetMoviesParam>,
    res: Response<unknown>,
  ): Promise<HttpResponse<unknown>> {
    try {
      if (!httpRequest.body) {
        return badRequest("Body parameter is required")
      }

      const genreList = await this.GetMoviesRepository.getMovieGenreList()

      return ok(genreList)
    } catch (error) {
      return notFound()
    }
  }
}
