import { ShowType } from "@/models/Show"
import { GenreList } from "../protocols"

export interface GetTvSeriesParam {
  id: string
  token: string
  types:
    | "trending"
    | "popular"
    | "airingToday"
    | "onTheAir"
    | "topRated"
    | "tvSeriesDetails"
  page?: number
  tv_series_id?: number
}

export interface GetTvSeriesByGenreParam {
  genre: number
}

export interface GetTvSeriesByGenreReturn {
  currentPage: number
  totalPages: number
  tvSeries: ShowType[]
}

export interface GetTvSeriesReturn {}

export interface IGetTvSeriesRepository {
  getTrendingTvSeries(params: GetTvSeriesParam): Promise<ShowType[]>
  getPopularTvSeries(params: GetTvSeriesParam): Promise<ShowType[]>
  getAiringTodayTvSeries(params: GetTvSeriesParam): Promise<ShowType[]>
  getOnTheAirTvSeries(params: GetTvSeriesParam): Promise<ShowType[]>
  getTopRatedTvSeries(params: GetTvSeriesParam): Promise<ShowType[]>
  getTvSeriesDetails(params: GetTvSeriesParam): Promise<ShowType>
  getTvSeriesGenreList(): Promise<GenreList[]>
  getTvSeriesByGenre(
    params: GetTvSeriesByGenreParam,
  ): Promise<GetTvSeriesByGenreReturn>
}
