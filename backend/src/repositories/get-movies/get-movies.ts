/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  GetMoviesByGenreParam,
  GetMoviesParam,
  GetMoviesReturn,
  IGetMoviesRepository,
} from "@/controllers/get-movies/protocols"
import { GenreList } from "@/controllers/protocols"
import { ShowType } from "@/models/Show"
import axios from "axios"

export class GetMoviesRepository implements IGetMoviesRepository {
  async getMoviesByGenre(
    params: GetMoviesByGenreParam,
  ): Promise<GetMoviesReturn> {
    const response = await axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${params.genre}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `${process.env.TMDB_API_KEY}`,
          },
        },
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching movies by genre:", error)
      })

    if (response === undefined) {
      throw new Error("Failed to fetch movies by genre")
    }

    return {
      page: response.page,
      total_pages: response.total_pages,
      movies: response.results,
    }
  }

  async getMovieGenreList(): Promise<GenreList[]> {
    const response = await axios
      .get("https://api.themoviedb.org/3/genre/movie/list", {
        headers: {
          accept: "application/json",
          Authorization: `${process.env.TMDB_API_KEY}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching movie genre list:", error)
      })

    if (response === undefined) {
      throw new Error("Failed to fetch movie genre list")
    }

    return response.genres
  }

  async getPopularMovies(params: GetMoviesParam): Promise<GetMoviesReturn> {
    /* https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc */
    const response = await axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${params.page}&sort_by=popularity.desc`,
        {
          headers: {
            accept: "application/json",
            Authorization: `${process.env.TMDB_API_KEY}`,
          },
        },
      )
      .then((response) => response.data)

      .catch((error) => {
        console.error("Error fetching popular movie:", error)
      })

    if (response === undefined) {
      throw new Error("Failed to fetch popular movies")
    }

    return {
      movies: response.results,
      page: response.page,
      total_pages: response.total_pages,
    }
  }

  async getNowPlayingMovies(params: GetMoviesParam): Promise<GetMoviesReturn> {
    const response = await axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&include_adult=false&include_video=false&page=${params.page}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `${process.env.TMDB_API_KEY}`,
          },
        },
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching now playing movies:", error)
      })

    if (response === undefined) {
      throw new Error("Failed to fetch now playing movies")
    }

    return {
      movies: response.results,
      page: response.page,
      total_pages: response.total_pages,
    }
  }

  async getTopRatedMovies(params: GetMoviesParam): Promise<GetMoviesReturn> {
    const response = await axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&include_adult=false&include_video=false&page=${params.page}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `${process.env.TMDB_API_KEY}`,
          },
        },
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching top rated movies:", error)
      })

    if (response === undefined) {
      throw new Error("Failed to fetch top rated movies")
    }

    return {
      movies: response.results,
      page: response.page,
      total_pages: response.total_pages,
    }
  }

  async getTrendingMovies(params: GetMoviesParam): Promise<GetMoviesReturn> {
    const response = await axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/week?language=en-US${params.page ? `&page=${params.page}` : ""}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `${process.env.TMDB_API_KEY}`,
          },
        },
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching trending movies:", error)
      })

    if (response === undefined) {
      throw new Error("Failed to fetch trending movies")
    }

    return {
      movies: response.results,
      page: response.page,
      total_pages: response.total_pages,
    }
  }

  async getUpcomingMovies(params: GetMoviesParam): Promise<GetMoviesReturn> {
    const response = await axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US${params.page ? `&page=${params.page}` : ""}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `${process.env.TMDB_API_KEY}`,
          },
        },
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching upcoming movies:", error)
      })

    if (response === undefined) {
      throw new Error("Failed to fetch trending movies")
    }

    return {
      movies: response.results,
      page: response.page,
      total_pages: response.total_pages,
    }
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
