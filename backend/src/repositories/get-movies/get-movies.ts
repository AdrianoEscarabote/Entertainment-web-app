/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  GetMoviesParam,
  IGetMoviesRepository,
} from "@/controllers/get-movies/protocols"
import { ShowType } from "@/models/Show"
import axios from "axios"

export class GetMoviesRepository implements IGetMoviesRepository {
  async getPopularMovies(params: GetMoviesParam): Promise<ShowType[]> {
    const response = await axios
      .get("https://api.themoviedb.org/3/movie/popular", {
        headers: {
          accept: "application/json",
          Authorization: `${process.env.TMDB_API_KEY}`,
        },
      })
      .then((response) => response.data)

      .catch((error) => {
        console.error("Error fetching popular movie:", error)
      })

    if (response === undefined) {
      throw new Error("Failed to fetch popular movies")
    }

    return response.results
  }

  async getNowPlayingMovies(params: GetMoviesParam): Promise<ShowType[]> {
    const response = await axios
      .get("https://api.themoviedb.org/3/movie/now_playing", {
        headers: {
          accept: "application/json",
          Authorization: `${process.env.TMDB_API_KEY}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching now playing movies:", error)
      })

    if (response === undefined) {
      throw new Error("Failed to fetch now playing movies")
    }

    return response.results
  }

  async getTopRatedMovies(params: GetMoviesParam): Promise<ShowType[]> {
    const response = await axios
      .get("https://api.themoviedb.org/3/movie/top_rated", {
        headers: {
          accept: "application/json",
          Authorization: `${process.env.TMDB_API_KEY}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching top rated movies:", error)
      })

    if (response === undefined) {
      throw new Error("Failed to fetch top rated movies")
    }

    return response.results
  }

  async getTrendingMovies(params: GetMoviesParam): Promise<ShowType[]> {
    const response = await axios
      .get(`https://api.themoviedb.org/3/trending/movie/week?language=en-US`, {
        headers: {
          accept: "application/json",
          Authorization: `${process.env.TMDB_API_KEY}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching trending movies:", error)
      })

    if (response === undefined) {
      throw new Error("Failed to fetch trending movies")
    }

    return response.results
  }

  async getUpcomingMovies(params: GetMoviesParam): Promise<ShowType[]> {
    const response = await axios
      .get("https://api.themoviedb.org/3/movie/upcoming", {
        headers: {
          accept: "application/json",
          Authorization: `${process.env.TMDB_API_KEY}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching upcoming movies:", error)
      })

    if (response === undefined) {
      throw new Error("Failed to fetch trending movies")
    }

    return response.results
  }

  async getMovieDetails(params: GetMoviesParam): Promise<ShowType> {
    const response = await axios
      .get(`https://api.themoviedb.org/3/movie/${params.movie_id}`, {
        headers: {
          accept: "application/json",
          Authorization: `${process.env.TMDB_API_KEY}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching movie details: ", error)
      })

    if (response === undefined) {
      throw new Error("Failed to fetch movie details")
    }

    return response
  }
}
