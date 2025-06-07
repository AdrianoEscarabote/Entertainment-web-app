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
      const { type } = httpRequest.body!

      if (!type) {
        return badRequest("Type parameter is required")
      }

      let movies: GetMoviesReturn

      if (type === "now playing") {
        movies = await this.GetMoviesRepository.getNowPlayingMovies(
          httpRequest.params,
        )
      } else if (type === "popular") {
        movies = await this.GetMoviesRepository.getPopularMovies(
          httpRequest.params,
        )
      } else if (type === "top rated") {
        movies = await this.GetMoviesRepository.getTopRatedMovies(
          httpRequest.params,
        )
      } else if (type === "trending") {
        movies = await this.GetMoviesRepository.getTrendingMovies(
          httpRequest.params,
        )
      } else if (type === "movie details" && httpRequest.body) {
        movies = await this.GetMoviesRepository.getMovieDetails(
          httpRequest.body,
        )
      } else {
        return badRequest("Invalid type parameter")
      }

      return ok(movies)
    } catch (error) {
      return notFound()
    }
  }
}
