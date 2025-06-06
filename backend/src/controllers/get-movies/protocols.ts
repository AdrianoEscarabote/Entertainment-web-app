import { MovieType } from "@/models/Movie"

export interface GetMoviesParam {
  id: string
  token: string
  type: "popular" | "recommended"
}

export interface GetMoviesReturn {
  movies: MovieType[]
  success: boolean
}

export interface IGetMoviesRepository {
  getPopularMovies(params: GetMoviesParam): Promise<GetMoviesReturn>
  getRecommendedMovies(params: GetMoviesParam): Promise<GetMoviesReturn>
}
