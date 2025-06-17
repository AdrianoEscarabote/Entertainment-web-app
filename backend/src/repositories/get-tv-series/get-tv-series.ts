import {
  GetTvSeriesParam,
  IGetTvSeriesRepository,
} from "@/controllers/get-tv-series/protocols"
import { GenreList } from "@/controllers/protocols"
import { ShowType } from "@/models/Show"
import axios from "axios"

export class GetTvSeriesRepository implements IGetTvSeriesRepository {
  async getTvSeriesGenreList(): Promise<GenreList[]> {
    const response = await axios
      .get("https://api.themoviedb.org/3/genre/tv/list", {
        headers: {
          accept: "application/json",
          Authorization: `${process.env.TMDB_API_KEY}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching TV series genre list:", error)
      })

    if (response === undefined) {
      throw new Error("Failed to fetch TV series genre list")
    }

    return response.genres
  }

  async getTrendingTvSeries(params: GetTvSeriesParam): Promise<ShowType[]> {
    const response = await axios
      .get(
        `https://api.themoviedb.org/3/trending/tv/week?language=en-US${params.page ? `&page=${params.page}` : ""}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `${process.env.TMDB_API_KEY}`,
          },
        },
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching trending TV series:", error)
      })

    if (response === undefined) {
      throw new Error("Failed to fetch trending movies")
    }

    return response.results
  }

  async getPopularTvSeries(params: GetTvSeriesParam): Promise<ShowType[]> {
    const response = await axios
      .get(
        `https://api.themoviedb.org/3/tv/popular?language=en-US${params.page ? `&page=${params.page}` : ""}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `${process.env.TMDB_API_KEY}`,
          },
        },
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching popular TV series:", error)
      })

    if (response === undefined) {
      throw new Error("Failed to fetch popular movies")
    }

    return response.results
  }

  async getAiringTodayTvSeries(params: GetTvSeriesParam): Promise<ShowType[]> {
    const response = await axios
      .get(
        `https://api.themoviedb.org/3/tv/airing_today?language=en-US${params.page ? `&page=${params.page}` : ""}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `${process.env.TMDB_API_KEY}`,
          },
        },
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching airing today TV series:", error)
      })

    if (response === undefined) {
      throw new Error("Failed to fetch airing today movies")
    }

    return response.results
  }

  async getOnTheAirTvSeries(params: GetTvSeriesParam): Promise<ShowType[]> {
    const response = await axios
      .get(
        `https://api.themoviedb.org/3/tv/on_the_air?language=en-US${params.page ? `&page=${params.page}` : ""}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `${process.env.TMDB_API_KEY}`,
          },
        },
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching on the air TV series:", error)
      })

    if (response === undefined) {
      throw new Error("Failed to fetch on the air movies")
    }

    return response.results
  }

  async getTopRatedTvSeries(params: GetTvSeriesParam): Promise<ShowType[]> {
    const response = await axios
      .get(
        `https://api.themoviedb.org/3/tv/top_rated?language=en-US${params.page ? `&page=${params.page}` : ""}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `${process.env.TMDB_API_KEY}`,
          },
        },
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching top rated TV series:", error)
      })

    if (response === undefined) {
      throw new Error("Failed to fetch top rated movies")
    }

    return response.results
  }

  async getTvSeriesDetails(params: GetTvSeriesParam): Promise<ShowType> {
    if (!params.tv_series_id) {
      throw new Error("TV series ID is required")
    }

    const response = await axios
      .get(`https://api.themoviedb.org/3/tv/${params.tv_series_id}`, {
        headers: {
          accept: "application/json",
          Authorization: `${process.env.TMDB_API_KEY}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching TV series details:", error)
      })

    if (response === undefined) {
      throw new Error("Failed to fetch TV series details")
    }

    return response
  }
}
