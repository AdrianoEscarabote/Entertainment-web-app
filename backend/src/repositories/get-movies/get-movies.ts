import {
  GetMoviesParam,
  GetMoviesReturn,
  IGetMoviesRepository,
} from "@/controllers/get-movies/protocols"

export class GetMoviesRepository implements IGetMoviesRepository {
  async getPopularMovies(params: GetMoviesParam): Promise<GetMoviesReturn> {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
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
        console.error("Error fetching latest movie:", error)
      })

    if (response === undefined) {
      throw new Error("Failed to fetch popular movies")
    }

    return {
      movies: response.results,
      success: true,
    }
  }

  async getRecommendedMovies(params: GetMoviesParam): Promise<GetMoviesReturn> {
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
        console.error("Error fetching recommended movies:", error)
      })

    if (response === undefined) {
      throw new Error("Failed to fetch recommended movies")
    }

    console.log(response)

    return {
      movies: response.results,
      success: true,
    }
  }
}
