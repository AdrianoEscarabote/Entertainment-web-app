import { Response } from "express"
import { HttpRequest, HttpResponse, IController } from "../protocols"
import {
  GetTvSeriesParam,
  GetTvSeriesReturn,
  IGetTvSeriesRepository,
} from "./protocols"
import { badRequest, ok } from "../helpers"

export class GetTvSeriesController implements IController {
  constructor(private readonly GetTvSeriesRepository: IGetTvSeriesRepository) {}

  async handle(
    httpRequest: HttpRequest<GetTvSeriesParam>,
    res: Response<unknown>,
  ): Promise<HttpResponse<GetTvSeriesReturn | string>> {
    try {
      const { types } = httpRequest.body!

      if (!types || !Array.isArray(types)) {
        return badRequest("Types parameter must be an array")
      }

      const promise = types.map(async (type) => {
        switch (type) {
          case "trending":
            return [
              "trending",
              await this.GetTvSeriesRepository.getTrendingTvSeries(
                httpRequest.body as GetTvSeriesParam,
              ),
            ]
          case "popular":
            return [
              "popular",
              await this.GetTvSeriesRepository.getPopularTvSeries(
                httpRequest.body as GetTvSeriesParam,
              ),
            ]
          case "airingToday":
            return [
              "airingToday",
              await this.GetTvSeriesRepository.getAiringTodayTvSeries(
                httpRequest.body as GetTvSeriesParam,
              ),
            ]
          case "onTheAir":
            return [
              "onTheAir",
              await this.GetTvSeriesRepository.getOnTheAirTvSeries(
                httpRequest.body as GetTvSeriesParam,
              ),
            ]
          case "topRated":
            return [
              "topRated",
              await this.GetTvSeriesRepository.getTopRatedTvSeries(
                httpRequest.body as GetTvSeriesParam,
              ),
            ]
          case "tvSeriesDetails":
            return [
              "tvSeriesDetails",
              await this.GetTvSeriesRepository.getTvSeriesDetails(
                httpRequest.body as GetTvSeriesParam,
              ),
            ]
          default:
            throw new Error(`Unknown type: ${type}`)
        }
      })

      const entries = await Promise.all(promise)
      const result = Object.fromEntries(entries)

      if (types.includes("tvSeriesDetails")) {
        const { tvSeriesDetails } = result
        return ok(tvSeriesDetails)
      }

      return ok(result)
    } catch (error) {
      return badRequest("error")
    }
  }
}
