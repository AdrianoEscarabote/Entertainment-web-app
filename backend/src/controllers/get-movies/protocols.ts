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

export interface GetMoviesReturn {
  movies: ShowType[]
  page: number
  total_pages: number
}

export interface GetMoviesByGenreParam {
  genre: string
}

export interface IGetMoviesRepository {
  getMoviesByGenre(params: GetMoviesByGenreParam): Promise<GetMoviesReturn>
  getNowPlayingMovies(params: GetMoviesParam): Promise<GetMoviesReturn>
  getPopularMovies(params: GetMoviesParam): Promise<GetMoviesReturn>
  getTopRatedMovies(params: GetMoviesParam): Promise<GetMoviesReturn>
  getTrendingMovies(params: GetMoviesParam): Promise<GetMoviesReturn>
  getUpcomingMovies(params: GetMoviesParam): Promise<GetMoviesReturn>
  getMovieDetails(params: GetMoviesParam): Promise<ShowType>
  getMovieGenreList(): Promise<GenreList[]>
}
