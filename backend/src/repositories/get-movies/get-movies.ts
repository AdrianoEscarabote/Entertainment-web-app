/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  GetMoviesParam,
  GetMoviesReturn,
  IGetMoviesRepository,
} from "@/controllers/get-movies/protocols"

export class GetMoviesRepository implements IGetMoviesRepository {
  async getPopularMovies(params: GetMoviesParam): Promise<GetMoviesReturn> {
    const response = await fetch("https://api.themoviedb.org/3/movie/popular", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${process.env.TMDB_API_KEY}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data
      })
      .catch((error) => {
        console.error("Error fetching popular movie:", error)
      })

    if (response === undefined) {
      throw new Error("Failed to fetch popular movies")
    }

    return {
      movies: response.results,
      success: true,
    }
  }

  async getNowPlayingMovies(params: GetMoviesParam): Promise<GetMoviesReturn> {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `${process.env.TMDB_API_KEY}`,
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        return data
      })
      .catch((error) => {
        console.error("Error fetching now playing movies:", error)
      })

    if (response === undefined) {
      throw new Error("Failed to fetch now playing movies")
    }

    return {
      movies: response.results,
      success: true,
    }
  }

  async getTopRatedMovies(params: GetMoviesParam): Promise<GetMoviesReturn> {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `${process.env.TMDB_API_KEY}`,
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        return data
      })
      .catch((error) => {
        console.error("Error fetching top rated movies:", error)
      })

    if (response === undefined) {
      throw new Error("Failed to fetch top rated movies")
    }

    return {
      movies: response.results,
      success: true,
    }
  }

  async getTrendingMovies(params: GetMoviesParam): Promise<GetMoviesReturn> {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?language=en-US`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `${process.env.TMDB_API_KEY}`,
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        return data
      })
      .catch((error) => {
        console.error("Error fetching trending movies:", error)
      })

    if (response === undefined) {
      throw new Error("Failed to fetch trending movies")
    }

    return {
      movies: response.results,
      success: true,
    }
  }

  async getMovieDetails(params: GetMoviesParam): Promise<GetMoviesReturn> {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${params.movie_id}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `${process.env.TMDB_API_KEY}`,
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        return data
      })
      .catch((error) => {
        console.error("Error fetching movie details: ", error)
      })

    if (response === undefined) {
      throw new Error("Failed to fetch movie details")
    }

    return {
      movies: response,
      success: true,
    }
  }
}
