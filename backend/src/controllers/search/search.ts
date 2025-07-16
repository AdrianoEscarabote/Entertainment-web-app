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
      const { query, type } = httpRequest.body!

      if (!query || !type) {
        return badRequest("Query and type are required")
      }

      let results: SeachReturn

      results = await this.SearchRepository.search({
        query,
        type,
      })

      return ok(results)
    } catch (error) {
      return serverError()
    }
  }
}
