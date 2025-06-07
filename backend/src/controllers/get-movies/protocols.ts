import { ShowType } from "@/models/Show"

export interface GetMoviesParam {
  id: string
  token: string
  type: "popular" | "top rated" | "now playing" | "trending" | "movie details"
  movie_id?: string
}

export interface GetMoviesReturn {
  movies: ShowType[]
  success: boolean
}

export interface IGetMoviesRepository {
  getNowPlayingMovies(params: GetMoviesParam): Promise<GetMoviesReturn>
  getPopularMovies(params: GetMoviesParam): Promise<GetMoviesReturn>
  getTopRatedMovies(params: GetMoviesParam): Promise<GetMoviesReturn>
  getTrendingMovies(params: GetMoviesParam): Promise<GetMoviesReturn>
  getMovieDetails(params: GetMoviesParam): Promise<GetMoviesReturn>
}
