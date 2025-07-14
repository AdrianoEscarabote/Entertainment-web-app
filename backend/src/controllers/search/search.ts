import { Response } from "express"
import { HttpRequest, HttpResponse, IController } from "../protocols"
import { ISearchRepository, SeachReturn, SearchParam } from "./protocols"
import { badRequest, ok, serverError } from "../helpers"

export class SearchController implements IController {
  constructor(private readonly SearchRepository: ISearchRepository) {}

  async handle(
    httpRequest: HttpRequest<SearchParam>,
    res: Response<unknown>,
  ): Promise<HttpResponse<SeachReturn | string>> {
    try {
      const { category, genre, query, type } = httpRequest.body!

      if (!query || !type) {
        return badRequest("Query and type are required")
      }

      let results: SeachReturn

      if (category) {
        results = await this.SearchRepository.getSearchByCategory({
          category,
          genre,
          query,
          type,
        })
      } else if (genre) {
        results = await this.SearchRepository.getSearchByGenre({
          category: "",
          genre,
          query,
          type,
        })
      } else {
        results = await this.SearchRepository.getSearchByQuery({
          category: "",
          genre: [],
          query,
          type,
        })
      }

      return ok(results)
    } catch (error) {
      return serverError()
    }
  }
}
