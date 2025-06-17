import { ShowType } from "@/models/Show"
import { GenreList } from "../protocols"

export interface GetMoviesParam {
  id: string
  token: string
  types:
    | "popular"
    | "top-rated"
    | "now-playing"
    | "trending"
    | "upcoming"
    | "movie details"
  page?: number
  movie_id?: number
}

export interface GetMoviesReturn {}

export interface IGetMoviesRepository {
  getNowPlayingMovies(params: GetMoviesParam): Promise<ShowType[]>
  getPopularMovies(params: GetMoviesParam): Promise<ShowType[]>
  getTopRatedMovies(params: GetMoviesParam): Promise<ShowType[]>
  getTrendingMovies(params: GetMoviesParam): Promise<ShowType[]>
  getUpcomingMovies(params: GetMoviesParam): Promise<ShowType[]>
  getMovieDetails(params: GetMoviesParam): Promise<ShowType>
  getMovieGenreList(): Promise<GenreList[]>
}
