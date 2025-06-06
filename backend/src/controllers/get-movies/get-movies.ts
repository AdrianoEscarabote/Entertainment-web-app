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
    res: Response<unknown>,
  ): Promise<HttpResponse<GetMoviesReturn | string>> {
    try {
      const { type } = httpRequest.body!

      if (!type) {
        return badRequest("Type parameter is required")
      }

      let movies: GetMoviesReturn

      if (type === "popular") {
        movies = await this.GetMoviesRepository.getPopularMovies(
          httpRequest.params,
        )
      } else if (type === "recommended") {
        movies = await this.GetMoviesRepository.getRecommendedMovies(
          httpRequest.params,
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
