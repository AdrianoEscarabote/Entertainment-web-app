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
  page?: number
}

export interface GetTvSeriesByGenreReturn {
  currentPage: number
  total_pages: number
  tvSeries: ShowType[]
}

export interface GetTvSeriesReturn {
  page: number
  total_pages: number
  tvSeries: ShowType[]
}

export interface IGetTvSeriesRepository {
  getTrendingTvSeries(params: GetTvSeriesParam): Promise<GetTvSeriesReturn>
  getPopularTvSeries(params: GetTvSeriesParam): Promise<GetTvSeriesReturn>
  getAiringTodayTvSeries(params: GetTvSeriesParam): Promise<GetTvSeriesReturn>
  getOnTheAirTvSeries(params: GetTvSeriesParam): Promise<GetTvSeriesReturn>
  getTopRatedTvSeries(params: GetTvSeriesParam): Promise<GetTvSeriesReturn>
  getTvSeriesDetails(params: GetTvSeriesParam): Promise<ShowType>
  getTvSeriesGenreList(): Promise<GenreList[]>
  getTvSeriesByGenre(
    params: GetTvSeriesByGenreParam,
  ): Promise<GetTvSeriesByGenreReturn>
}
