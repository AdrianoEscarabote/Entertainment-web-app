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

export interface GetMoviesByGenreReturn {
  currentPage: number
  totalPages: number
  movies: ShowType[]
}

export interface GetMoviesReturn {}

export interface GetMoviesByGenreParam {
  genre: string
}

export interface IGetMoviesRepository {
  getMoviesByGenre(
    params: GetMoviesByGenreParam,
  ): Promise<GetMoviesByGenreReturn>
  getNowPlayingMovies(params: GetMoviesParam): Promise<ShowType[]>
  getPopularMovies(params: GetMoviesParam): Promise<ShowType[]>
  getTopRatedMovies(params: GetMoviesParam): Promise<ShowType[]>
  getTrendingMovies(params: GetMoviesParam): Promise<ShowType[]>
  getUpcomingMovies(params: GetMoviesParam): Promise<ShowType[]>
  getMovieDetails(params: GetMoviesParam): Promise<ShowType>
  getMovieGenreList(): Promise<GenreList[]>
}
